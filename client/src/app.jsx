import styled, { createGlobalStyle } from "styled-components";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { VoteActions } from "./components/vote-actions.jsx";
import { VoteButtons } from "./components/vote-buttons.jsx";
import { VoteStats } from "./components/vote-stats.jsx";
import { Votes } from "./components/votes.jsx";
import { VoteTimer } from "./components/vote-timer.jsx";
import { GitHubIcon } from "./components/github-icon.jsx";
import { useVotes } from "./hooks/votes.js";
import { useLoading } from "./hooks/loading.js";
import { useVoteStats } from "./hooks/vote-stats.js";

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		overflow-x: hidden;
	}

	* {
		${({ $loading }) => $loading && "cursor: progress !important;"}
	}

	#root {
		min-width: 320px;
		min-height: 100vh;
		display: grid;
		place-items: center;
	}

	h1 {
		margin-bottom: 0;
	}

	.nes-btn {
		border-image-repeat: stretch ;
	}
`;

const AppContainer = styled.div`
	display: flex;
	gap: 24px;
	flex-direction: column;
	max-width: min(576px, calc(100vw - 32px));
	margin: 32px 16px;

	@media (min-width: 768px) {
		transform: scale(110%);
	}
`;

export function App() {
	const { width, height } = useWindowSize();
	const { display } = useVotes();
	const { consensus } = useVoteStats();
	const loading = useLoading();

	return (
		<>
			<AppContainer>
				<GlobalStyle $loading={loading} />
				<GitHubIcon />
				<h1>Pointing Poker</h1>
				<VoteButtons />
				<VoteActions />
				<Votes />
				{!display && <VoteTimer />}
				<VoteStats />
			</AppContainer>
			<Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={consensus ? 500 : 0}
				onConfettiComplete={(confetti) => confetti.reset()}
			/>
		</>
	);
}
