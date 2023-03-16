import styled from "styled-components";

const StyledVoteRow = styled.div`
	display: grid;
	justify-content: center;
	margin-bottom: 8px;
	grid-template: 1fr / 40px 1fr 1fr;
`;

const Name = styled.div`
	grid-column: 2;
`;

const Vote = styled.div`
	width: 48px;
	justify-self: center;
	background-color: ${({ display }) => (display ? "transparent" : "#212529")};
`;

export function VoteRow({ name, vote, display }) {
	return (
		<StyledVoteRow>
			{vote !== "?" && "🟢"}
			<Name>{name}</Name>
			<Vote display={display}>{display ? vote : "?"}</Vote>
		</StyledVoteRow>
	);
}
