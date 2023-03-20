import styled from "styled-components";

const StyledButton = styled.button`
	margin: 8px;
`;

export function Button({ children, onClick, className = "" }) {
	return (
		<StyledButton
			type="button"
			className={`nes-btn ${className}`}
			onClick={onClick}
		>
			{children}
		</StyledButton>
	);
}
