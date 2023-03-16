import styled from "styled-components";

const Vote = styled.div`
	width: 32px;
	margin-left: 16px;
	background-color: ${({ display }) => (display ? "transparent" : "#212529")};
`;

const StyledVoteRow = styled.div`
	display: flex;
	justify-content: center;
`;

export function VoteRow({ name, vote, display }) {
	return (
		<StyledVoteRow>
			{name}:<Vote display={display}>{display ? vote : "?"}</Vote>
		</StyledVoteRow>
	);
}
