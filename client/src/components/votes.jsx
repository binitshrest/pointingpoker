import { useStore } from "../store.js";

export default function Votes() {
	const { votes } = useStore();

	return (
		<div className="container nes-container with-title">
			<p className="title">Votes</p>
			{Object.keys(votes).map((name) => (
				<Vote
					key={name}
					name={name}
					vote={votes[name].vote}
					display={votes[name].display}
				/>
			))}
		</div>
	);
}

function Vote({ name, vote, display }) {
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			{name}:
			<div
				style={{
					backgroundColor: display ? "transparent" : "#212529",
					width: 32,
					marginLeft: 16,
				}}
			>
				{display ? vote : "?"}
			</div>
		</div>
	);
}
