import { useSyncExternalStore } from "react";

let data = {};

function subscribe(callback) {
	const eventSource = new window.EventSource("/events");

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
