import { useSyncExternalStore } from "react";
import "./app.css";
import store from "./store.js";

function App() {
	const count = useSyncExternalStore(store.subscribe, store.getSnapshot);

	return (
		<div className="App">
			<div />
			<h1>Vite + React</h1>
			<div className="card">
				<button
					type="button"
					onClick={() => {
						window.fetch("/count", {
							method: "POST",
							mode: "cors",
						});
					}}
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</div>
	);
}

export default App;
