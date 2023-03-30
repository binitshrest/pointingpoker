import PQueue from "p-queue";
import { useSyncExternalStore } from "react";

let loading = false;

// Used for loading indicator on all async code
// asyncQueue has Infinity concurrency
export const asyncQueue = new PQueue();

asyncQueue.addListener("add", () => {
	loading = true;
});

asyncQueue.addListener("idle", () => {
	loading = false;
});

asyncQueue.addListener("error", (error) => {
	console.error("Error while executing function in async queue", error);
});

function subscribe(callback) {
	asyncQueue.addListener("add", callback);

	asyncQueue.addListener("idle", callback);

	return () => {
		asyncQueue.removeListener("add", callback);
		asyncQueue.removeListener("idle", callback);
	};
}

function getLoading() {
	return loading;
}

export function useLoading() {
	return useSyncExternalStore(subscribe, getLoading);
}
