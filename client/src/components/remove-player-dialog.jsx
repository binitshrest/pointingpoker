import { forwardRef } from "react";
import { removePlayer } from "../utils/api.js";
import { Button } from "./button.jsx";

export const RemovePlayerDialog = forwardRef(function ({ playerName }, ref) {
	return (
		<dialog ref={ref} className="nes-dialog">
			<form method="dialog">
				<p className="title">Caution</p>
				<p>
					Are you sure you want to remove player{" "}
					<span className="nes-text is-primary">{playerName}</span> ?
				</p>
				<div>
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
				</div>
			</form>
		</dialog>
	);
});
