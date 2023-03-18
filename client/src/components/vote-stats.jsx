import styled from "styled-components";
import { useVotes } from "../votes.js";

const VoteStatsContainer = styled.div`
	text-align: center;
`;

export function VoteStats() {
	const { display, averageVote } = useVotes();

	if (display) {
		return (
			<VoteStatsContainer className="nes-container with-title">
				<p className="title">Stats</p>
				Average vote is {averageVote}
			</VoteStatsContainer>
		);
	}

	return null;
}
