import styled from "styled-components";
import { useName } from "../hooks/name.js";
import { useToggle } from "../hooks/toggle.js";
import { NameForm } from "./name-form.jsx";
import { NameBox } from "./name-box.jsx";

const NameContainer = styled.div`
	grid-column: 2;
	text-align: left;
`;

export function Name({ children }) {
	const { name, newPlayer } = useName();

	const editable = children === name;

	const [input, toggleInput] = useToggle(newPlayer);

	return (
		<NameContainer>
			{input && editable ? (
				<NameForm initialValue={children} toggleInput={toggleInput} />
			) : (
				<NameBox editable={editable} onClick={toggleInput}>
					{children}
				</NameBox>
			)}
		</NameContainer>
	);
}
