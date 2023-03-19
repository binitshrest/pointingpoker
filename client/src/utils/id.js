import { nanoid } from "nanoid";

function createId() {
	const createdId = nanoid();
	localStorage.setItem("id", createdId);
	return createdId;
}

export const id = localStorage.getItem("id") ?? createId();
