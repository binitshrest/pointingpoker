import { useStore } from "./store"

export function useVotes(): {
  users: Room["users"]
  display: boolean
  voteValues: number[]
} {
  const { users } = useStore()

  const voteValues = Object.values(users).map(({ vote }) => vote)
  const display = Object.values(users).every(({ hasVoted }) => hasVoted)

  return { users, display, voteValues }
}
