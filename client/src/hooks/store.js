import { useSyncExternalStore } from "react";
import pWaitFor from "p-wait-for";
import { id } from "../utils/id.js";
import { decrypt, deriveSecretKey, publicKey } from "../../../utils/crypto.js";
import { getName } from "./name.js";
import { asyncQueue } from "./loading.js";

let store = { votes: {}, startTime: 0, timeTaken: 0, error: false };
let secretKey;

const eventSource = new EventSource(
	`${
		import.meta.env.VITE_SERVER_BASE_URL
	}/api/events/${id}/${getName()}/${encodeURI(JSON.stringify(publicKey))}`
);

eventSource.addEventListener("error", (event) => {
	console.log("Error in event source", event);
	eventSource.close();
	store.error = true;
});

eventSource.addEventListener(
	"key",
	async (event) => {
		const serverPublicKey = event.data;
		try {
			secretKey = await asyncQueue.add(() => deriveSecretKey(serverPublicKey));
		} catch (error) {
			console.error("Error in key event listener", error);
			throw error;
		}
	},
	{ once: true }
);

eventSource.addEventListener("message", async (event) => {
	try {
		const encryptedMessage = JSON.parse(event.data);

		try {
			// Wait for secret key to be derived before decrypting message
			await pWaitFor(() => Boolean(secretKey));
		} catch (error) {
			console.error("Error while waiting for secret key", error);
			throw error;
		}

		store = await asyncQueue.add(() => decrypt(secretKey, encryptedMessage));

		const storeUpdateEvent = new CustomEvent("store-update");
		eventSource.dispatchEvent(storeUpdateEvent);
	} catch (error) {
		console.error("Error in message event listener", error);
		throw error;
	}
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
