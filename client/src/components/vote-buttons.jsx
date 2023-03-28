import styled from "styled-components";
import { vote } from "../utils/api.js";
import { Button } from "./button.jsx";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

export function VoteButtons() {
	return (
		<Container>
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
		</Container>
	);
}
