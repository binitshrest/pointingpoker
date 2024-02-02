import { useStore } from "./store.js"

export function useVotes() {
  const { users } = useStore()

  const voteValues = Object.values(users).map(({ vote }) => vote)
  const display = Object.values(users).every(({ hasVoted }) => hasVoted)

  return { users, display, voteValues }
}
