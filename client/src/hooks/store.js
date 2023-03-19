import { useSyncExternalStore } from "react";
import { id } from "../utils/id.js";
import { getName } from "./name.js";

let store = { votes: {} };

const eventSource = new EventSource(
	`${import.meta.env.VITE_SERVER_BASE_URL}/api/events/${id}/${getName()}`
);

eventSource.addEventListener("message", (event) => {
	store = JSON.parse(event.data);
	console.log("new data", store);
});

function subscribe(callback) {
	eventSource.addEventListener("message", callback);

	return () => eventSource.removeEventListener("message", callback);
}

export function getStore() {
	return store;
}

export function useStore() {
	return useSyncExternalStore(subscribe, getStore);
}
