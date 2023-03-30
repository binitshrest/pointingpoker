import { forwardRef } from "react";
import styled from "styled-components";
import { removePlayer } from "../utils/api.js";
import { Button } from "./button.jsx";
import { Highlight } from "./highlight.jsx";

const ButtonContainer = styled.div`
	display: flex;
	gap: 48px;
	justify-content: end;
	padding-top: 10px;
`;

export const RemovePlayerDialog = forwardRef(function ({ playerName }, ref) {
	return (
		<dialog ref={ref} className="nes-dialog">
			<form method="dialog">
				<p className="title">Caution</p>
				<p>
					Are you sure you want to remove player{" "}
					<Highlight>{playerName}</Highlight> from the session?
				</p>
				<ButtonContainer>
					<Button
						onClick={() => {
							ref.current.close();
						}}
					>
						Cancel
					</Button>
					<Button
						className="is-primary"
						onClick={() => {
							removePlayer(playerName);
						}}
					>
						Confirm
					</Button>
				</ButtonContainer>
			</form>
		</dialog>
	);
});
