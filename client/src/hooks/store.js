import { useSyncExternalStore } from "react";
import pWaitFor from "p-wait-for";
import { id } from "../utils/id.js";
import { decrypt, deriveSecretKey, publicKey } from "../../../utils/crypto.js";
import { getName } from "./name.js";
import { asyncQueue } from "./loading.js";

let store = { votes: {} };
let secretKey;

const eventSource = new EventSource(
	`${
		import.meta.env.VITE_SERVER_BASE_URL
	}/api/events/${id}/${getName()}/${encodeURI(JSON.stringify(publicKey))}`
);

eventSource.addEventListener(
	"key",
	async (event) => {
		const serverPublicKey = event.data;
		secretKey = await asyncQueue.add(() => deriveSecretKey(serverPublicKey));
	},
	{ once: true }
);

eventSource.addEventListener("message", async (event) => {
	const encryptedMessage = JSON.parse(event.data);

	// Wait for secret key to be derived before decrypting message
	await pWaitFor(() => Boolean(secretKey));

	store = await asyncQueue.add(() => decrypt(secretKey, encryptedMessage));
	const storeUpdateEvent = new CustomEvent("store-update");
	eventSource.dispatchEvent(storeUpdateEvent);
});

function subscribe(callback) {
	eventSource.addEventListener("store-update", callback);

	return () => eventSource.removeEventListener("store-update", callback);
}

export function getStore() {
	return store;
}

export function useStore() {
	return useSyncExternalStore(subscribe, getStore);
}
