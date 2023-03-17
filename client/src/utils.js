export const MY_NAME = `player${Math.floor(Math.random() * 100)}`;

export function vote(vote) {
	return fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/vote`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			vote,
			name: MY_NAME,
		}),
	});
}
