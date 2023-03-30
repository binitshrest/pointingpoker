import { useState } from "react";
import classNames from "classnames";
import styled from "styled-components";
import { useName, validateName } from "../hooks/name.js";

const StyledInput = styled.input`
	width: 100%;
	max-width: 180px;
	padding: 0;
`;

export function NameForm({ initialValue, toggleInput }) {
	const { setName, newPlayer } = useName();
	const [input, setInput] = useState(newPlayer ? "" : initialValue);

	const handleChange = (event) => {
		event.preventDefault();
		if (!validateName(input.trim())) return;

		toggleInput();
		setName(input.trim());
		setInput(input.trim());
	};

	return (
		<form onSubmit={handleChange} onBlur={handleChange}>
			<StyledInput
				autoFocus
				placeholder={newPlayer ? "Enter name" : ""}
				className={classNames("nes-input", {
					"is-error": !validateName(input.trim()),
				})}
				value={input}
				onChange={(event) => setInput(event.target.value)}
			/>
		</form>
	);
}
