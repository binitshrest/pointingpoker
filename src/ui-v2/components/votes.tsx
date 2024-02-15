import { useVotes } from "@/hooks/votes"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { currentUserId } from "@/utils/firebase"
import { getCurrentVote } from "@/hooks/store"
import { Name } from "./name"
import { Check } from "lucide-react"

export function Votes() {
  const { users, display } = useVotes()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votes</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(users).map(([id, { name, hasVoted, vote }]) => (
          <div key={id} className="grid mb-2 grid-cols-[15%_2fr_1fr]">
            {hasVoted && (
              <div className="mr-4 flex justify-center">
                <Check />
              </div>
            )}
            <Name>{name}</Name>
            <div>
              {display
                ? vote
                : hasVoted && id === currentUserId
                  ? getCurrentVote()
                  : "?"}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
