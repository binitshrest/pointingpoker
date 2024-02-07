import { useStore } from "@/hooks/store"
import { useVoteStats } from "@/hooks/vote-stats"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Duration } from "luxon"

export function VoteStats() {
  const {
    averageVote,
    modeVote,
    consensus,
    minMaxVotes: { minVote, minVoters, maxVote, maxVoters },
  } = useVoteStats()
  const { startTime, endTime } = useStore()

  if (!averageVote) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-center">
        {consensus ? (
          "Consensus! 🎉🎉🎉"
        ) : (
          <>
            <div>
              Average vote is <Badge>{averageVote}</Badge>
            </div>
            <div>
              {minVoters} voted nominally with <Badge>{minVote}</Badge>
            </div>
            <div>
              {maxVoters} voted the ceiling with <Badge>{maxVote}</Badge>
            </div>
            {modeVote && (
              <div>
                Most people voted <Badge>{modeVote}</Badge>
              </div>
            )}
          </>
        )}
        {endTime && (
          <div>
            Session concluded in{" "}
            <Badge>
              {Duration.fromMillis((endTime as number) - (startTime as number))
                .rescale()
                .set({ milliseconds: 0 })
                .rescale()
                .toHuman({
                  unitDisplay: "narrow",
                  listStyle: "short",
                  maximumFractionDigits: 0,
                })}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// [ ]: redo highlight
// [ ]: redo typography
