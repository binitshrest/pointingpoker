import styled from "styled-components";

const StyledVoteRow = styled.div`
	display: flex;
	justify-content: center;
`;

const Name = styled.div`
	margin-left: 8px;
`;

const Vote = styled.div`
	width: 32px;
	margin-left: 16px;
	background-color: ${({ display }) => (display ? "transparent" : "#212529")};
`;

export function VoteRow({ name, vote, display }) {
	return (
		<StyledVoteRow>
			{vote !== "?" && "🟢"}
			<Name>{name}:</Name>
			<Vote display={display}>{display ? vote : "?"}</Vote>
		</StyledVoteRow>
	);
}
