import "./app.css";
import Votes from "./components/votes.jsx";

const MY_NAME = `player${Math.floor(Math.random() * 100)}`;

export default function App() {
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
				<Votes />
			</div>
		</div>
	);
}
