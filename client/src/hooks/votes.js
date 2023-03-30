import { useStore } from "./store.js";

export function useVotes() {
	const { votes } = useStore();

	const voteValues = Object.values(votes).map(({ vote }) => vote);
	const display =
		voteValues.length > 0 && voteValues.every((vote) => vote !== "?");

	return { votes, display, voteValues };
}
