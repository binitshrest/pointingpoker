import { clearVotes } from "../utils/api.js";
import { Button } from "./button.jsx";

export function VoteActions() {
	return (
		<div>
			<Button onClick={clearVotes}>Clear Votes</Button>
		</div>
	);
}
