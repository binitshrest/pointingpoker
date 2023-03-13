import { useSyncExternalStore } from "react";
import "./app.css";
import store from "./store.js";

function App() {
	const { count } = useSyncExternalStore(store.subscribe, store.getSnapshot);

	return (
		<div>
			<div />
			<h1>Pointing Poker</h1>
			<div className="card">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
					<button
						key={number}
						type="button"
						className="btn nes-btn"
						onClick={() => {
							window.fetch("/count", {
								method: "POST",
								mode: "cors",
							});
						}}
					>
						{number}
					</button>
				))}
				<div className="container nes-container with-title">
					<p className="title">Count</p>
					<p>{count}</p>
				</div>
			</div>
		</div>
	);
}

export default App;
