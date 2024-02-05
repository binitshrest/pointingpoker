import styled from "styled-components"
import { BoxIconButton } from "./box-icon-button.jsx"
import { GitHubIcon } from "./github-icon.jsx"
import { toggleUI } from "../../utils/ui"

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1536px;
  flex-wrap: wrap;

  h2 {
    padding-right: 32px;
  }
`

const HeaderButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

export function Header() {
  return (
    <HeaderContainer>
      <h2>Pointing Poker</h2>
      <HeaderButtonGroup>
        <BoxIconButton onClick={toggleUI} />
        <GitHubIcon />
      </HeaderButtonGroup>
    </HeaderContainer>
  )
}
