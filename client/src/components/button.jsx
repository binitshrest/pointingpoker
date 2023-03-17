import styled from "styled-components";

const StyledButton = styled.button`
	margin: 8px;
`;

export function Button({ children, onClick }) {
	return (
		<StyledButton type="button" className="nes-btn" onClick={onClick}>
			{children}
		</StyledButton>
	);
}
