import { useStore } from "../store.js";

export default function Votes() {
	const { votes } = useStore();

	return (
		<div className="container nes-container with-title">
			<p className="title">Votes</p>
			{Object.keys(votes).map((name) => (
				<Vote key={name} name={name} vote={votes?.[name]?.vote ?? "?"} />
			))}
		</div>
	);
}

function Vote({ name, vote }) {
	return (
		<p>
			{name}: {vote}
		</p>
	);
}
