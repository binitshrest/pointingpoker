import { editName } from "../utils/api.js";

let name = `player${Math.floor(Math.random() * 100)}`;

export function getName() {
	return name;
}

async function changeName(newName) {
	const response = await editName(newName);
	({ newName: name } = await response.json());
}

export function useName() {
	return { name, changeName };
}
