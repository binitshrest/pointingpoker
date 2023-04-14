import { useState } from "react";
import clsx from "clsx";
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
	const [formError, setFormError] = useState(false);

	const handleChange = (event) => {
		event.preventDefault();
		if (formError) return;

		toggleInput();
		setName(input.trim());
		setInput(input.trim());
	};

	return (
		<form onSubmit={handleChange} onBlur={handleChange}>
			<StyledInput
				autoFocus
				placeholder={newPlayer ? "Enter name" : ""}
				className={clsx("nes-input", {
					"is-error": formError,
				})}
				value={input}
				onChange={(event) => {
					setInput(event.target.value);
					setFormError(!validateName(event.target.value.trim()));
				}}
			/>
		</form>
	);
}
