import { useSyncExternalStore } from "react";
import PQueue from "p-queue";
import { id } from "../utils/id.js";
import { decrypt, deriveSecretKey, publicKey } from "../../../utils/crypto.js";
import { getName } from "./name.js";

const queue = new PQueue({ concurrency: 1 });

let store = { votes: {} };
let secretKey;

const eventSource = new EventSource(
	`${
		import.meta.env.VITE_SERVER_BASE_URL
	}/api/events/${id}/${getName()}/${encodeURI(JSON.stringify(publicKey))}`
);

eventSource.addEventListener(
	"key",
	(event) => {
		const serverPublicKey = event.data;
		queue.add(async () => {
			secretKey = await deriveSecretKey(serverPublicKey);
		});
	},
	{ once: true }
);

eventSource.addEventListener("message", (event) => {
	const encryptedMessage = JSON.parse(event.data);
	queue.add(async () => {
		store = await decrypt(secretKey, encryptedMessage);
		const storeUpdateEvent = new Event("store-update");
		eventSource.dispatchEvent(storeUpdateEvent);
	});
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
