import styled from "styled-components";

const StyledName = styled.div`
	grid-column: 2;
	text-align: left;
`;

export function Name({ children }) {
	return <StyledName>{children}</StyledName>;
}
