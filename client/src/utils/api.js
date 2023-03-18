import { getName } from "../hooks/name.js";

export function vote(vote) {
	return fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/vote`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			vote,
			name: getName(),
		}),
	});
}

export function clearVotes() {
	return fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/vote`, {
		method: "DELETE",
	});
}

export function editName(currentName, newName) {
	return fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/name`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			currentName,
			newName,
		}),
	});
}
