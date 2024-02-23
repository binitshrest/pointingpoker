import { useVotes } from "@/hooks/votes"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { currentUserId } from "@/utils/firebase"
import { getCurrentVote } from "@/hooks/store"
import { Name } from "./name"
import { Check } from "lucide-react"

export function VotesCard() {
  const { users, display } = useVotes()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {Object.entries(users).map(([id, { name, hasVoted, vote }]) => (
          <div key={id} className="grid grid-cols-[15%_2fr_1fr]">
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
