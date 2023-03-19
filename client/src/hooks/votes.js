import { useStore } from "./store.js";

export function useVotes() {
	const { votes } = useStore();

	let averageVote = "?";
	let consensus = false;

	const voteValues = Object.values(votes);
	const display =
		voteValues.length > 0 && voteValues.every(({ vote }) => vote !== "?");
	if (display) {
		averageVote = Number(
			(
				voteValues.reduce((total, { vote }) => total + vote, 0) /
				voteValues.length
			).toFixed(2)
		);
		consensus =
			voteValues.length > 1 &&
			voteValues.every(({ vote }) => vote === voteValues[0].vote);
	}

	return { votes, display, averageVote, consensus };
}
