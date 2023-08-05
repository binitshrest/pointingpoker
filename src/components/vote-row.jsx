import styled from "styled-components";
import { Emoji } from "./emoji.jsx";
import { Name } from "./name.jsx";

const StyledVoteRow = styled.div`
  display: grid;
  margin-bottom: 8px;
  grid-template: 1fr / 15% 2fr 1fr;
`;

const StyledEmoji = styled(Emoji)`
  margin-right: 16px;
  text-align: right;
`;

const Vote = styled.div`
  width: 48px;
  justify-self: center;
  background-color: ${({ $display }) => ($display ? "transparent" : "#212529")};
`;

export function VoteRow({ name, vote, display, hasVoted }) {
  return (
    <StyledVoteRow>
      {hasVoted && <StyledEmoji>🟢</StyledEmoji>}
      <Name>{name}</Name>
      <Vote $display={display}>{display && hasVoted ? vote : "?"}</Vote>
    </StyledVoteRow>
  );
}
