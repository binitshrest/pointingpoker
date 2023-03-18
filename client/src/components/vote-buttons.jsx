import { vote } from "../utils/api.js";
import { Button } from "./button.jsx";

export function VoteButtons() {
	return (
		<div>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
				<Button
					key={number}
					onClick={() => {
						vote(number);
					}}
				>
					{number}
				</Button>
			))}
		</div>
	);
}
