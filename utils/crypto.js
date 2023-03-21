// Isomorphic crypto

let crypto = globalThis.crypto;

if (!crypto) {
	({
		default: { webcrypto: crypto },
	} = await import("node:crypto"));
}

const deriveKeyPair = await crypto.subtle.generateKey(
	{
		name: "ECDH",
		namedCurve: "P-384",
	},
	true,
	["deriveKey"]
);

export const publicKey = await crypto.subtle.exportKey(
	"jwk",
	deriveKeyPair.publicKey
);

export async function deriveSecretKey(counterpartPublicKey) {
	const { privateKey } = deriveKeyPair;
	const importedPublicKey = await crypto.subtle.importKey(
		"jwk",
		JSON.parse(counterpartPublicKey),
		{ name: "ECDH", namedCurve: "P-384" },
		false,
		[]
	);
	return crypto.subtle.deriveKey(
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
}

export async function encrypt(key, data) {
	const iv = crypto.getRandomValues(new Uint8Array(16));
	const encodedData = new TextEncoder().encode(data);

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
}

export async function decrypt(key, message) {
	const { iv, cipherText } = message;

	const ivBuffer = new Uint8Array(iv).buffer;
	const cipherTextBuffer = new Uint8Array(cipherText).buffer;

	const decryptedData = await crypto.subtle.decrypt(
		{
			name: "AES-CBC",
			iv: ivBuffer,
		},
		key,
		cipherTextBuffer
	);

	return JSON.parse(new TextDecoder().decode(decryptedData));
}
