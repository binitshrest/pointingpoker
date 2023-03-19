import styled from "styled-components";
import { useState } from "react";
import classNames from "classnames";
import { useName, validateName } from "../hooks/name.js";
import { useToggle } from "../hooks/toggle.js";

const StyledName = styled.div`
	grid-column: 2;
	text-align: left;
	cursor: ${({ editable }) =>
		editable &&
		"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)14 0, pointer"};
`;

const StyledInput = styled.input`
	width: 100%;
	max-width: 180px;
	padding: 0;
`;

export function Name({ children }) {
	const { name, setName } = useName();
	const [inputMode, toggleInputMode] = useToggle();
	const [input, setInput] = useState(children);

	const handleChange = (event) => {
		event.preventDefault();
		if (!validateName(input.trim())) return;

		toggleInputMode();
		setName(input.trim());
		setInput(input.trim());
	};

	const editable = children === name;

	return (
		<StyledName editable={editable}>
			{inputMode && editable ? (
				<form onSubmit={handleChange} onBlur={toggleInputMode}>
					<StyledInput
						autoFocus
						className={classNames("nes-input", {
							"is-error": !validateName(input.trim()),
						})}
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
				</form>
			) : (
				<div onClick={toggleInputMode}>{children}</div>
			)}
		</StyledName>
	);
}
