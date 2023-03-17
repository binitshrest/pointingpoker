import styled, { createGlobalStyle } from "styled-components";
import { VoteActions } from "./components/vote-actions.jsx";
import { VoteButtons } from "./components/vote-buttons.jsx";
import { Votes } from "./components/votes.jsx";

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

	.nes-container>:last-child {
		margin-bottom: 8px;
	}
`;

const AppContainer = styled.div`
	display: flex;
	gap: 1rem;
	flex-direction: column;
`;

export function App() {
	return (
		<AppContainer>
			<GlobalStyle />
			<h1>Pointing Poker</h1>
			<VoteButtons />
			<VoteActions />
			<Votes />
		</AppContainer>
	);
}
