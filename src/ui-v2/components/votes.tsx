import { useVotes } from "@/hooks/votes"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { currentUserId } from "@/utils/firebase"
import { getCurrentVote } from "@/hooks/store"
import { Name } from "./name"

export function Votes() {
  const { users, display } = useVotes()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votes</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(users).map((id) => (
          <div key={id} className="grid mb-2 grid-cols-[15%_2fr_1fr]">
            {/* [ ]: adjust alignment and typography */}
            {users[id].hasVoted && (
              <span className="inline-block self-center text-right mr-4">
                🟢 {/* [ ]: better alternative maybe? */}
              </span>
            )}
            <Name>{users[id].name}</Name>
            <div>{getVote(display, id, users)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function getVote(
  display: boolean,
  id: string,
  users: Room["users"],
): "?" | number {
  if (display) return users[id].vote

  if (users[id].hasVoted && id === currentUserId) return getCurrentVote()

  return "?"
}
