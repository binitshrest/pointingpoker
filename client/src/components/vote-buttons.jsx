import styled from "styled-components";
import { useStore } from "../hooks/store.js";
import { vote } from "../utils/api.js";
import { Button } from "./button.jsx";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

export function VoteButtons() {
	const { voteOptions, selectedVoteOptionsIndex } = useStore();

	return (
		<Container>
			{voteOptions[selectedVoteOptionsIndex].map((number) => (
				<Button
					key={number}
					onClick={() => {
						vote(number);
					}}
				>
					{number}
				</Button>
			))}
		</Container>
	);
}
