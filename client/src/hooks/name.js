import { setName as setNameInStore } from "../utils/api.js";

let name = localStorage.getItem("name") ?? createName();

function createName() {
	const createdName = `player${Math.floor(Math.random() * 100)}`;
	localStorage.setItem("name", createdName);
	return createdName;
}

export function getName() {
	return name;
}

async function setName(newName) {
	try {
		const response = await setNameInStore(newName);
		({ newName: name } = await response.json());
		localStorage.setItem("name", newName);
	} catch (error) {
		console.error("Error while changing name", error);
	}
}

export function useName() {
	return { name, setName };
}
