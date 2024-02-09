import styled from "styled-components"
import { GradientIconButton } from "./gradient-icon-button.jsx"
import { GitHubIcon } from "./github-icon.jsx"
import { renderV2 } from "../../utils/ui-v2"

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1536px;
  flex-wrap: wrap;

  h2 {
    padding-right: 32px;
    margin: 4px 0;
  }
`

const HeaderButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-content: center;
`

export function Header() {
  return (
    <HeaderContainer>
      <h2>Pointing Poker</h2>
      <HeaderButtonGroup>
        <GradientIconButton onClick={renderV2} />
        <GitHubIcon />
      </HeaderButtonGroup>
    </HeaderContainer>
  )
}
