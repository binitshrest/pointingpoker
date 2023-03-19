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
	const [input, setInput] = useState(initialValue);
	const { setName } = useName();

	const handleChange = (event) => {
		event.preventDefault();
		if (!validateName(input.trim())) return;

		toggleInput();
		setName(input.trim());
		setInput(input.trim());
	};

	return (
		<form onSubmit={handleChange} onBlur={toggleInput}>
			<StyledInput
				autoFocus
				className={classNames("nes-input", {
					"is-error": !validateName(input.trim()),
				})}
				value={input}
				onChange={(event) => setInput(event.target.value)}
			/>
		</form>
	);
}
