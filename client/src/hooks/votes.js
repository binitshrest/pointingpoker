import { useStore } from "./store.js";

function getAverage(numbers) {
	return Number(
		(
			numbers.reduce((total, number) => total + number, 0) / numbers.length
		).toFixed(2)
	);
}

function getMode(numbers) {
	let mode = [];
	const frequencyMap = {};
	let maxFrequency = 0;

	for (const number of numbers) {
		frequencyMap[number] = (frequencyMap[number] || 0) + 1;
		if (maxFrequency < frequencyMap[number]) {
			maxFrequency = frequencyMap[number];
			mode = [number];
		} else if (maxFrequency === frequencyMap[number]) {
			mode.push(number);
		}
	}

	return mode;
}

function transformMode(mode, numberOfVotes) {
	if (numberOfVotes === mode.length) {
		return "";
	}

	return mode.join(", ").replace(/,([^,]+)$/, " and $1");
}

function isAllEqual(list) {
	return list.length > 1 && list.every((number) => number === list[0]);
}

export function useVotes() {
	const { votes } = useStore();

	let averageVote = "?";
	let modeVote = [];
	let consensus = false;

	const voteValues = Object.values(votes).map(({ vote }) => vote);
	const display =
		voteValues.length > 0 && voteValues.every((vote) => vote !== "?");
	if (display) {
		averageVote = getAverage(voteValues);
		modeVote = transformMode(getMode(voteValues), voteValues.length);
		consensus = isAllEqual(voteValues);
	}

	return { votes, display, averageVote, modeVote, consensus };
}
