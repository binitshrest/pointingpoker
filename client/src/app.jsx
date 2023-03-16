import "./app.css";
import Votes from "./components/votes.jsx";
import { joinSession, vote } from "./utils.js";

joinSession();

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
							vote(number);
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
