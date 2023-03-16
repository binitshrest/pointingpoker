import styled, { createGlobalStyle } from "styled-components";
import Votes from "./components/votes.jsx";
import { vote } from "./utils.js";

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		display: flex;
		place-items: center;
		min-width: 320px;
		min-height: 100vh;
	}

	#root {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
	}
`;

const Button = styled.button`
	margin: 8px;
`;

export default function App() {
	return (
		<>
			<GlobalStyle />
			<h1>Pointing Poker</h1>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
				<Button
					key={number}
					type="button"
					className="nes-btn"
					onClick={() => {
						vote(number);
					}}
				>
					{number}
				</Button>
			))}
			<Votes />
		</>
	);
}
