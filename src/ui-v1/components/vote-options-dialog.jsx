import { forwardRef, useRef } from "react"
import styled from "styled-components"
import { useStore } from "../../hooks/store.js"
import { selectVoteOptions } from "../../utils/rtdb.js"
import { Button } from "./button.jsx"
import { CustomVoteOptionsDialog } from "./custom-vote-options-dialog.jsx"

const StyledLabel = styled.label`
  display: block;
`

const ButtonContainer1 = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`

const ButtonContainer2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  justify-content: space-between;
  padding-top: 10px;
`

export const VoteOptionsDialog = forwardRef(
  function VoteOptionsDialog(props, ref) {
    const { voteOptionsList, selectedVoteOptionsKey } = useStore()
    const customVoteOptionsDialogRef = useRef()

    const handleSubmit = async (event) => {
      event.preventDefault()

      const formData = new FormData(event.target)
      await selectVoteOptions(formData.get("voteOptions"))
      ref.current.close()
    }

    return (
      <>
        <dialog
          ref={ref}
          className="nes-dialog"
          onClick={(event) => {
            if (event.target.tagName === "DIALOG") {
              ref.current.close()
            }
          }}
        >
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
                <span>{Object.values(options).join(", ")}</span>
              </StyledLabel>
            ))}
            <ButtonContainer1>
              <Button
                onClick={() => {
                  customVoteOptionsDialogRef.current?.showModal()
                }}
              >
                Create options
              </Button>
            </ButtonContainer1>
            <ButtonContainer2>
              <Button
                onClick={() => {
                  ref.current.close()
                }}
              >
                Cancel
              </Button>
              <Button submit className="is-primary">
                Select
              </Button>
            </ButtonContainer2>
          </form>
        </dialog>
        <CustomVoteOptionsDialog ref={customVoteOptionsDialogRef} />
      </>
    )
  },
)
