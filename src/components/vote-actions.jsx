import { useRef } from "react";
import styled from "styled-components";
import { clearVotes } from "../utils/api.js";
import { Button } from "./button.jsx";
import { VoteOptionsDialog } from "./vote-options-dialog.jsx";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

const StyledButton = styled(Button)`
	flex-grow: 1;
`;

export function VoteActions() {
	const dialogRef = useRef();

	return (
		<Container>
			<StyledButton onClick={clearVotes}>Clear Votes</StyledButton>
			<StyledButton
				onClick={() => {
					dialogRef.current?.showModal();
				}}
			>
				Change Vote Options
			</StyledButton>
			<VoteOptionsDialog ref={dialogRef} />
		</Container>
	);
}
