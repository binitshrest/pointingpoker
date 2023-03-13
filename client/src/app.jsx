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
				<button
					type="button"
					className="nes-btn"
					onClick={() => {
						window.fetch("/count", {
							method: "POST",
							mode: "cors",
						});
					}}
				>
					count is {count}
				</button>
			</div>
		</div>
	);
}

export default App;
