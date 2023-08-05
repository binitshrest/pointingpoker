import styled from "styled-components";
import { Duration } from "luxon";
import { useStore } from "../hooks/store.js";
import { useVoteStats } from "../hooks/vote-stats.js";
import { Emoji } from "./emoji.jsx";
import { Highlight } from "./highlight.jsx";

const StatRow = styled.div`
  margin-bottom: 8px;
`;

export function VoteStats() {
  const {
    averageVote,
    modeVote,
    consensus,
    minMaxVote: { minVote, minVoters, maxVote, maxVoters },
  } = useVoteStats();
  const { timeTaken } = useStore();

  if (averageVote) {
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
              Average vote is <Highlight>{averageVote}</Highlight>
            </StatRow>
            <StatRow>
              <Highlight>{minVoters}</Highlight> voted the lowest:{" "}
              <Highlight>{minVote}</Highlight>
            </StatRow>
            <StatRow>
              <Highlight>{maxVoters}</Highlight> voted the highest:{" "}
              <Highlight>{maxVote}</Highlight>
            </StatRow>
            {modeVote && (
              <StatRow>
                Most people voted <Highlight>{modeVote}</Highlight>
              </StatRow>
            )}
          </>
        )}
        {timeTaken && (
          <StatRow>
            <Highlight>
              {Duration.fromMillis(timeTaken).rescale().toHuman({
                unitDisplay: "short",
                listStyle: "short",
                maximumFractionDigits: 0,
              })}
            </Highlight>{" "}
            for all to vote
          </StatRow>
        )}
      </div>
    );
  }

  return null;
}
