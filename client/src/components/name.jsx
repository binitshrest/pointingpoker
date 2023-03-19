import styled from "styled-components";
import { useRef, useState } from "react";
import { useName } from "../hooks/name.js";

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
	const { name, changeName } = useName();
	const [inputMode, setInputMode] = useState(false);
	const inputRef = useRef(null);

	const handleChange = () => {
		setInputMode(false);
		const newName = inputRef.current?.value?.trim?.();
		if (newName && newName !== name) {
			changeName(inputRef.current.value);
		}
	};

	const editable = children === name;

	return (
		<StyledName editable={editable}>
			{inputMode && editable ? (
				<form onSubmit={handleChange} onBlur={handleChange}>
					<StyledInput
						ref={inputRef}
						autoFocus
						className="nes-input"
						defaultValue={children}
					/>
				</form>
			) : (
				<div onClick={() => setInputMode(true)}>{children}</div>
			)}
		</StyledName>
	);
}
