import { useName } from "../hooks/name.js";
import { useVotes } from "../hooks/votes.js";
import { VoteRow } from "./vote-row.jsx";

export function Votes() {
	const { votes, display } = useVotes();
	const { name } = useName();

	return (
		<div className="nes-container with-title is-centered">
			<p className="title">Votes</p>
			{Object.keys(votes).map((id) => (
				<VoteRow
					key={id}
					name={votes[id].name}
					vote={votes[id].vote}
					display={display || votes[id].name === name}
				/>
			))}
		</div>
	);
}
