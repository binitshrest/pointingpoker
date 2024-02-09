import { currentUser, currentUserId } from "./firebase"

export function isNewPlayer(): boolean {
  return currentUser.displayName === `player ${currentUserId.slice(0, 3)}`
}
