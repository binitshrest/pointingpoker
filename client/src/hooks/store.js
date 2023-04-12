import { useSyncExternalStore } from "react";
import pWaitFor from "p-wait-for";
import { id } from "../utils/id.js";
import { roomId } from "../utils/room-id.js";
import { decrypt, deriveSecretKey, publicKey } from "../../../utils/crypto.js";
import { getName } from "./name.js";
import { asyncQueue } from "./loading.js";

let store = {
	votes: {},
	startTime: 0,
	timeTaken: 0,
	voteOptions: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
	selectedVoteOptionsIndex: 0,
	connected: true,
};
const storeUpdateEvent = new CustomEvent("store-update");
let secretKey;

const eventSource = new EventSource(
	`${
		import.meta.env.VITE_SERVER_BASE_URL
	}/api/events/${roomId}/${id}/${getName()}/${encodeURI(
		JSON.stringify(publicKey)
	)}`
);

eventSource.addEventListener("error", (event) => {
	console.warn("Disconnected/Error in event source", event);
	eventSource.close();
	store = { ...store, connected: false };
	eventSource.dispatchEvent(storeUpdateEvent);
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

		store = {
			...store,
			...(await asyncQueue.add(() => decrypt(secretKey, encryptedMessage))),
		};

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
