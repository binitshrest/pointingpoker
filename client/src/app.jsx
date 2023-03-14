import { useSyncExternalStore } from "react";
import "./app.css";
import store from "./store.js";

function App() {
	const { vote } = useSyncExternalStore(store.subscribe, store.getSnapshot);

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
								body: JSON.stringify({ vote: number }),
							});
						}}
					>
						{number}
					</button>
				))}
				<div className="container nes-container with-title">
					<p className="title">Vote</p>
					<p>{vote}</p>
				</div>
			</div>
		</div>
	);
}

export default App;
