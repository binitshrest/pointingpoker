import { getCurrentVote } from "../../hooks/store"
import { useVotes } from "../../hooks/votes"
import { currentUserId } from "../../utils/firebase"
import { VoteRow } from "./vote-row.jsx"

export function Votes() {
  const { users, display } = useVotes()

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Votes</p>
      {Object.keys(users).map((id) => (
        <VoteRow
          key={id}
          name={users[id].name}
          // To show vote of current user without updating db
          vote={id === currentUserId ? getCurrentVote() : users[id].vote}
          hasVoted={users[id].hasVoted}
          display={display || id === currentUserId}
        />
      ))}
    </div>
  )
}
