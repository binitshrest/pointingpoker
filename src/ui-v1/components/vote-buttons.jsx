import styled from "styled-components"
import { useStore } from "../../hooks/store.js"
import { vote } from "../../utils/rtdb.js"
import { Button } from "./button.jsx"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export function VoteButtons() {
  const { voteOptionsList, selectedVoteOptionsKey } = useStore()

  return (
    <Container>
      {Object.values(voteOptionsList[selectedVoteOptionsKey]).map((number) => (
        <Button
          key={number}
          onClick={() => {
            vote(number)
          }}
        >
          {number}
        </Button>
      ))}
    </Container>
  )
}
