import styled from "styled-components";
import { useStore } from "../store.js";
import { VoteRow } from "./vote-row.jsx";

const StyledVotes = styled.div`
	margin-top: 16px;
`;

export default function Votes() {
	const { votes } = useStore();

	const display = Object.values(votes).every((vote) => vote !== "?");

	return (
		<StyledVotes className="nes-container with-title">
			<p className="title">Votes</p>
			{Object.keys(votes).map((name) => (
				<VoteRow key={name} name={name} vote={votes[name]} display={display} />
			))}
		</StyledVotes>
	);
}
