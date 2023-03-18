import styled, { createGlobalStyle } from "styled-components";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { VoteActions } from "./components/vote-actions.jsx";
import { VoteButtons } from "./components/vote-buttons.jsx";
import { VoteStats } from "./components/vote-stats.jsx";
import { Votes } from "./components/votes.jsx";
import { useVotes } from "./hooks/votes.js";

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		display: grid;
		place-items: center;
		min-width: 320px;
		min-height: 100vh;
	}

	#root {
		max-width: 576px;
		margin: 16px;
	}

	h1 {
		margin-bottom: 0;
	}
`;

const AppContainer = styled.div`
	display: flex;
	gap: 1rem;
	flex-direction: column;
`;

export function App() {
	const { width, height } = useWindowSize();
	const { consensus } = useVotes();

	return (
		<AppContainer>
			<GlobalStyle />
			<h1>Pointing Poker</h1>
			<VoteButtons />
			<VoteActions />
			<Votes />
			<VoteStats />
			<Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={consensus ? 500 : 0}
				onConfettiComplete={(confetti) => confetti.reset()}
			/>
		</AppContainer>
	);
}
