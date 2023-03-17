import { useSyncExternalStore } from "react";
import { MY_NAME } from "./utils.js";

let data = { votes: {} };

function subscribe(callback) {
	const eventSource = new EventSource(
		`${import.meta.env.VITE_SERVER_BASE_URL}/events/${MY_NAME}`
	);

	const listener = (event) => {
		data = JSON.parse(event.data);
		console.log("new data", data);
		callback();
	};

	eventSource.addEventListener("message", listener);

	return () => eventSource.removeEventListener("message", listener);
}

function getSnapshot() {
	return data;
}

export function useStore() {
	return useSyncExternalStore(subscribe, getSnapshot);
}
