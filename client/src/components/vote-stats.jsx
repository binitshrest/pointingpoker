import styled from "styled-components";
import { Duration } from "luxon";
import { useStore } from "../hooks/store.js";
import { useVotes } from "../hooks/votes.js";
import { Emoji } from "./emoji.jsx";

const StatRow = styled.div`
	margin-bottom: 8px;
`;

export function VoteStats() {
	const { display, averageVote, modeVote, consensus } = useVotes();
	const { timeTaken } = useStore();

	if (display) {
		return (
			<div className="nes-container with-title is-centered">
				<p className="title">Stats</p>
				{consensus ? (
					<StatRow>
						Consensus! <Emoji>🎉🎉🎉</Emoji>
					</StatRow>
				) : (
					<>
						<StatRow>
							Average vote is{" "}
							<span className="nes-text is-primary">{averageVote}</span>
						</StatRow>
						{modeVote && (
							<StatRow>
								Most people voted{" "}
								<span className="nes-text is-primary">{modeVote}</span>
							</StatRow>
						)}
					</>
				)}
				{timeTaken && (
					<StatRow>
						<span className="nes-text is-primary">
							{Duration.fromMillis(timeTaken).rescale().toHuman({
								unitDisplay: "short",
								listStyle: "short",
								maximumFractionDigits: 0,
							})}
						</span>{" "}
						for all to vote
					</StatRow>
				)}
			</div>
		);
	}

	return null;
}
