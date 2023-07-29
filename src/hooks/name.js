import { setName as setNameInStore } from "../utils/api.js";
import { getStore } from "./store.js";

let newPlayer = false;
let playerName = localStorage.getItem("name") ?? createName();

function createName() {
	const createdName = `player${Math.floor(Math.random() * 100)}`;
	localStorage.setItem("name", createdName);
	newPlayer = true;
	return createdName;
}

export function getName() {
	return playerName;
}

async function setName(name) {
	try {
		if (playerName === name) return;

		await setNameInStore(name);
		playerName = name;
		localStorage.setItem("name", name);

		newPlayer = false;
	} catch (error) {
		console.error("Error while changing name", error);
		throw error;
	}
}

export function validateName(name) {
	if (!name) return false;

	if (name === playerName) return true;

	const { votes } = getStore();
	const allNames = Object.values(votes).map(({ name }) => name);
	if (allNames.includes(name)) return false;

	return true;
}

export function useName() {
	return { name: playerName, setName, newPlayer };
}
