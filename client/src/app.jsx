import React, { useState } from "react";
import "./app.css";

const eventSource = new window.EventSource("http://localhost:3000/events");

eventSource.addEventListener('message', (event) => {
	console.log("new message", event.data);
});

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<div />
			<h1>Vite + React</h1>
			<div className="card">
				<button
					type="button"
					onClick={() => {
						setCount((count) => count + 1);
						window.fetch("http://localhost:3000/count", {
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
