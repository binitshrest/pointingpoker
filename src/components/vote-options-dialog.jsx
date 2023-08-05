import { forwardRef, useRef } from "react";
import styled from "styled-components";
import { useStore } from "../hooks/store.js";
import { selectVoteOptions } from "../utils/rtdb.js";
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
  const { voteOptionsList, selectedVoteOptionsKey } = useStore();
  const customVoteOptionsDialogRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    await selectVoteOptions(voteOptionsList[formData.get("voteOptions")]);
    ref.current.close();
  };

  return (
    <>
      <dialog ref={ref} className="nes-dialog">
        <form method="dialog" onSubmit={handleSubmit}>
          <p className="title">Vote Options</p>
          {Object.entries(voteOptionsList).map(([key, options]) => (
            <StyledLabel key={key}>
              <input
                type="radio"
                className="nes-radio"
                name="voteOptions"
                value={key}
                defaultChecked={key === selectedVoteOptionsKey}
              />
              <span>{options.join(", ")}</span>
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
