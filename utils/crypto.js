// Isomorphic crypto

let crypto = globalThis.crypto;

if (!crypto) {
	try {
		({
			default: { webcrypto: crypto },
		} = await import("node:crypto"));
	} catch (error) {
		console.error("Error while importing node:crypto", error);
		throw error;
	}
}

const deriveKeyPair = await generateKey();

export const publicKey = await exportKey(deriveKeyPair.publicKey);

export async function deriveSecretKey(counterpartPublicKey) {
	try {
		const { privateKey } = deriveKeyPair;
		const importedPublicKey = await importKey(counterpartPublicKey);
		const secretKey = await crypto.subtle.deriveKey(
			{
				name: "ECDH",
				public: importedPublicKey,
			},
			privateKey,
			{
				name: "AES-CBC",
				length: 256,
			},
			false,
			["encrypt", "decrypt"]
		);
		return secretKey;
	} catch (error) {
		console.error("Error while deriving secret key", error);
		throw error;
	}
}

export async function encrypt(key, data) {
	const iv = crypto.getRandomValues(new Uint8Array(16));
	const encodedData = new TextEncoder().encode(data);

	try {
		const encryptedData = await crypto.subtle.encrypt(
			{ name: "AES-CBC", iv },
			key,
			encodedData
		);

		const encodedEncryptedData = new Uint8Array(encryptedData);

		return JSON.stringify({
			iv: Array.from(iv),
			cipherText: Array.from(encodedEncryptedData),
		});
	} catch (error) {
		console.error("Error while encrypting data", error);
		throw error;
	}
}

export async function decrypt(key, message) {
	const { iv, cipherText } = message;

	const ivBuffer = new Uint8Array(iv).buffer;
	const cipherTextBuffer = new Uint8Array(cipherText).buffer;

	try {
		const decryptedData = await crypto.subtle.decrypt(
			{
				name: "AES-CBC",
				iv: ivBuffer,
			},
			key,
			cipherTextBuffer
		);

		return JSON.parse(new TextDecoder().decode(decryptedData));
	} catch (error) {
		console.error("Error while decrypting message", error);
		throw error;
	}
}

async function generateKey() {
	try {
		const keyPair = await crypto.subtle.generateKey(
			{
				name: "ECDH",
				namedCurve: "P-384",
			},
			true,
			["deriveKey"]
		);

		return keyPair;
	} catch (error) {
		console.error("Error while generating key pair", error);
		throw error;
	}
}

async function exportKey(key) {
	try {
		const exportedKey = await crypto.subtle.exportKey("jwk", key);
		return exportedKey;
	} catch (error) {
		console.error("Error while exporting key", error);
		throw error;
	}
}

async function importKey(key) {
	try {
		const importedKey = await crypto.subtle.importKey(
			"jwk",
			JSON.parse(key),
			{ name: "ECDH", namedCurve: "P-384" },
			false,
			[]
		);
		return importedKey;
	} catch (error) {
		console.error("Error while importing key", error);
		throw error;
	}
}
