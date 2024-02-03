import styled from "styled-components"
import { useToggle } from "../../hooks/toggle.js"
import { auth, currentUserId } from "../../utils/firebase.js"
import { NameForm } from "./name-form.jsx"
import { NameBox } from "./name-box.jsx"

const NameContainer = styled.div`
  grid-column: 2;
  text-align: left;
`

const isNewPlayer = () =>
  auth.currentUser.displayName === `player ${currentUserId.slice(0, 3)}`

export function Name({ children }) {
  const editable = children === auth.currentUser.displayName

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
