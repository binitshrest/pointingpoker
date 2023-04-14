import ky from "ky";
import { asyncQueue } from "../hooks/loading.js";
import { id } from "../utils/id.js";
import { roomId } from "./room-id.js";

const BASE_URL = `${import.meta.env.VITE_SERVER_BASE_URL}/api/${roomId}`;

export async function vote(vote) {
	try {
		await asyncQueue.add(() =>
			ky.post(`${BASE_URL}/${id}/vote`, { json: { vote } })
		);
	} catch (error) {
		console.error("Error in vote api", error);
		throw error;
	}
}

export async function clearVotes() {
	try {
		await asyncQueue.add(() => ky.delete(`${BASE_URL}/vote`));
	} catch (error) {
		console.error("Error in clearVotes api", error);
		throw error;
	}
}

export async function setName(name) {
	try {
		await asyncQueue.add(() =>
			ky.post(`${BASE_URL}/${id}/name`, { json: { name } })
		);
	} catch (error) {
		console.error("Error in setName api", error);
		throw error;
	}
}

export async function removePlayer(name) {
	try {
		await asyncQueue.add(() => ky.delete(`${BASE_URL}/${name}`));
	} catch (error) {
		console.error("Error in removePlayer api", error);
		throw error;
	}
}

export async function createVoteOptions(voteOptions) {
	try {
		await asyncQueue.add(() =>
			ky.post(`${BASE_URL}/vote-options`, { json: { voteOptions } })
		);
	} catch (error) {
		console.error("Error in createVoteOptions api", error);
		throw error;
	}
}

export async function selectVoteOption(selectedVoteOptionsIndex) {
	try {
		await asyncQueue.add(() =>
			ky.post(`${BASE_URL}/vote-options-index`, {
				json: { selectedVoteOptionsIndex },
			})
		);
	} catch (error) {
		console.error("Error in selectVoteOption api", error);
		throw error;
	}
}
