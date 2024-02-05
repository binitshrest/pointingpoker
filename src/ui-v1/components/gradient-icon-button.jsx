import styled from "styled-components"

const IconButton = styled.button`
  border: unset;
  background-color: unset;
  padding: unset;
  &:focus {
    outline: unset;
  }
  width: fit-content;
  height: fit-content;
`

const GradientIcon = styled.div`
  width: 24px;
  height: 24px;
  background: rgb(79, 79, 79);
  background: linear-gradient(
    157deg,
    rgba(79, 79, 79, 1) 0%,
    rgba(128, 128, 128, 1) 100%
  );
  border-radius: 50%;
`

export function GradientIconButton({ onClick }) {
  return (
    <IconButton onClick={onClick}>
      <GradientIcon />
    </IconButton>
  )
}
