import { asyncQueue } from "../hooks/loading.js";
import { id } from "../utils/id.js";

const BASE_URL = `${import.meta.env.VITE_SERVER_BASE_URL}/api`;

export async function vote(vote) {
	return asyncQueue.add(() =>
		fetch(`${BASE_URL}/${id}/vote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				vote,
			}),
		})
	);
}

export async function clearVotes() {
	return asyncQueue.add(() =>
		fetch(`${BASE_URL}/vote`, {
			method: "DELETE",
		})
	);
}

export async function setName(newName) {
	return asyncQueue.add(() =>
		fetch(`${BASE_URL}/${id}/name`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				newName,
			}),
		})
	);
}

export async function removePlayer(name) {
	return asyncQueue.add(() =>
		fetch(`${BASE_URL}/${name}`, {
			method: "DELETE",
		})
	);
}
