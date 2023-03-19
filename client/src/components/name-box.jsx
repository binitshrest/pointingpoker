import styled, { css } from "styled-components";
import { useHover } from "react-use";
import { removePlayer } from "../utils/api.js";

const cursorPointerStyle = css`
	cursor: ${({ $pointer }) =>
		$pointer &&
		"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)14 0, pointer"};
`;

const StyledName = styled.span`
	${cursorPointerStyle}
`;

const StyledIcon = styled.i`
	${cursorPointerStyle}
	margin-left: 16px !important;
	display: ${({ $display }) => ($display ? "inline-block" : "none")};
`;

export function NameBox({ children, onClick, editable }) {
	function NameBoxWithRemoveButton(hovered) {
		return (
			<div>
				<StyledName $pointer={editable} onClick={onClick}>
					{children}
				</StyledName>
				<StyledIcon
					$pointer
					$display={hovered}
					className="nes-icon close is-small"
					onClick={() => {
						removePlayer(children);
					}}
				/>
			</div>
		);
	}

	const [nameBoxWithRemoveButton] = useHover(NameBoxWithRemoveButton);

	return nameBoxWithRemoveButton;
}
