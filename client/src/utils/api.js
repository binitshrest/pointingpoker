import { id } from "../utils/id.js";

const BASE_URL = `${import.meta.env.VITE_SERVER_BASE_URL}/api`;

export function vote(vote) {
	return fetch(`${BASE_URL}/${id}/vote`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			vote,
		}),
	});
}

export function clearVotes() {
	return fetch(`${BASE_URL}/vote`, {
		method: "DELETE",
	});
}

export function editName(newName) {
	return fetch(`${BASE_URL}/${id}/name`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			newName,
		}),
	});
}
