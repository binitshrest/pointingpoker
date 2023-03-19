import styled from "styled-components";
import { useVotes } from "../hooks/votes.js";
import { VoteRow } from "./vote-row.jsx";

const VotesContainer = styled.div`
	margin-top: 8px;
`;

export function Votes() {
	const { votes, display } = useVotes();

	return (
		<VotesContainer className="nes-container with-title is-centered">
			<p className="title">Votes</p>
			{Object.keys(votes).map((id) => (
				<VoteRow
					key={id}
					name={votes[id].name}
					vote={votes[id].vote}
					display={display}
				/>
			))}
		</VotesContainer>
	);
}
