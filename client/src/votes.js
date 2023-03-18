import { useStore } from "./store.js";

export function useVotes() {
	const { votes } = useStore();

	let averageVote = "?";

	const display = Object.values(votes).every((vote) => vote !== "?");
	if (display) {
		const voteValues = Object.values(votes);
		averageVote =
			voteValues.reduce((total, vote) => total + vote, 0) / voteValues.length;
	}

	return { votes, display, averageVote };
}
