import { useStore } from "./store.js";

export function useVotes() {
	const { votes } = useStore();

	let averageVote = "?";
	let consensus = false;

	const display = Object.values(votes).every((vote) => vote !== "?");
	if (display) {
		const voteValues = Object.values(votes);
		averageVote = Number(
			(
				voteValues.reduce((total, vote) => total + vote, 0) / voteValues.length
			).toFixed(2)
		);
		consensus = voteValues.every((value) => value === voteValues[0]);
	}

	return { votes, display, averageVote, consensus };
}
