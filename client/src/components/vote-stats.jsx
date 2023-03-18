import styled from "styled-components";
import { useVotes } from "../votes.js";
import { Emoji } from "./emoji.jsx";

const StatRow = styled.div`
	margin-bottom: 8px;
`;

export function VoteStats() {
	const { display, averageVote, consensus } = useVotes();

	if (display) {
		return (
			<div className="nes-container with-title is-centered">
				<p className="title">Stats</p>
				<StatRow>Average vote is {averageVote}</StatRow>
				{consensus && (
					<StatRow>
						Consensus! <Emoji>🎉</Emoji>
					</StatRow>
				)}
			</div>
		);
	}

	return null;
}
