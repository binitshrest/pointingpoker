import styled from "styled-components"
import { useToggle } from "../../hooks/toggle"
import { currentUser, currentUserId } from "../../utils/firebase"
import { NameForm } from "./name-form.jsx"
import { NameBox } from "./name-box.jsx"

const NameContainer = styled.div`
  grid-column: 2;
  text-align: left;
`

const isNewPlayer = () =>
  currentUser.displayName === `player ${currentUserId.slice(0, 3)}`

export function Name({ children }) {
  const editable = children === currentUser.displayName

  const [input, toggleInput] = useToggle(isNewPlayer())

  return (
    <NameContainer>
      {input && editable ? (
        <NameForm
          initialValue={children}
          toggleInput={toggleInput}
          isNewPlayer={isNewPlayer()}
        />
      ) : (
        <NameBox
          editable={editable}
          isNewPlayer={isNewPlayer()}
          onClick={toggleInput}
        >
          {children}
        </NameBox>
      )}
    </NameContainer>
  )
}
