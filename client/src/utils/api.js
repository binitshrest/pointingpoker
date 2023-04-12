import { asyncQueue } from "../hooks/loading.js";
import { id } from "../utils/id.js";
import { roomId } from "./room-id.js";

const BASE_URL = `${import.meta.env.VITE_SERVER_BASE_URL}/api/${roomId}`;

export async function vote(vote) {
	try {
		await asyncQueue.add(() =>
			fetch(`${BASE_URL}/${id}/vote`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ vote }),
			})
		);
	} catch (error) {
		console.error("Error in vote api", error);
		throw error;
	}
}

export async function clearVotes() {
	try {
		await asyncQueue.add(() =>
			fetch(`${BASE_URL}/vote`, {
				method: "DELETE",
			})
		);
	} catch (error) {
		console.error("Error in clearVotes api", error);
		throw error;
	}
}

export async function setName(name) {
	try {
		await asyncQueue.add(async () =>
			fetch(`${BASE_URL}/${id}/name`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			})
		);
	} catch (error) {
		console.error("Error in setName api", error);
		throw error;
	}
}

export async function removePlayer(name) {
	try {
		await asyncQueue.add(() =>
			fetch(`${BASE_URL}/${name}`, {
				method: "DELETE",
			})
		);
	} catch (error) {
		console.error("Error in removePlayer api", error);
		throw error;
	}
}

export async function selectVoteOption(selectedVoteOptionsIndex) {
	try {
		await asyncQueue.add(() =>
			fetch(`${BASE_URL}/vote-options-index`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ selectedVoteOptionsIndex }),
			})
		);
	} catch (error) {
		console.error("Error in selectVoteOption api", error);
		throw error;
	}
}
