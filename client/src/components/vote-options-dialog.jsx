import { forwardRef, useRef } from "react";
import styled from "styled-components";
import { useStore } from "../hooks/store.js";
import { selectVoteOption } from "../utils/api.js";
import { Button } from "./button.jsx";
import { CustomVoteOptionsDialog } from "./custom-vote-options-dialog.jsx";

const StyledLabel = styled.label`
	display: block;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 48px;
	justify-content: space-between;
	padding-top: 10px;
`;

export const VoteOptionsDialog = forwardRef(function (props, ref) {
	const { voteOptions, selectedVoteOptionsIndex } = useStore();
	const customVoteOptionsDialogRef = useRef();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		await selectVoteOption(Number(formData.get("voteOption")));
		ref.current.close();
	};

	return (
		<>
			<dialog ref={ref} className="nes-dialog">
				<form method="dialog" onSubmit={handleSubmit}>
					<p className="title">Vote Options</p>
					{voteOptions.map((option, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<StyledLabel key={index}>
							<input
								type="radio"
								className="nes-radio"
								name="voteOption"
								value={index}
								defaultChecked={selectedVoteOptionsIndex === index}
							/>
							<span>{option.join(", ")}</span>
						</StyledLabel>
					))}
					<ButtonContainer>
						<Button
							onClick={() => {
								customVoteOptionsDialogRef.current?.showModal();
							}}
						>
							Create New
						</Button>
						<Button submit className="is-primary">
							Select
						</Button>
					</ButtonContainer>
				</form>
			</dialog>
			<CustomVoteOptionsDialog ref={customVoteOptionsDialogRef} />
		</>
	);
});
