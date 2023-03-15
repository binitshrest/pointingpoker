import { useSyncExternalStore } from "react";
import "./app.css";
import store from "./store.js";

const MY_NAME = `player${Math.floor(Math.random() * 100)}`;

function App() {
	const { votes } = useSyncExternalStore(store.subscribe, store.getSnapshot);

	return (
		<div>
			<div />
			<h1>Pointing Poker</h1>
			<div>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
					<button
						key={number}
						type="button"
						className="btn nes-btn"
						onClick={() => {
							window.fetch("/vote", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									vote: number,
									name: MY_NAME,
								}),
							});
						}}
					>
						{number}
					</button>
				))}
				<div className="container nes-container with-title">
					<p className="title">Vote</p>
					<p>
						{MY_NAME}: {votes?.[MY_NAME]?.vote ?? "?"}
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;
