import { useStore } from "@/hooks/store"
import { Button } from "./ui/button"
import { vote } from "@/utils/rtdb"

export function VoteButtons() {
  const { voteOptionsList, selectedVoteOptionsKey } = useStore()

  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(voteOptionsList[+selectedVoteOptionsKey]).map((number) => (
        <Button
          key={number}
          variant="outline"
          size="lg"
          onClick={() => {
            vote(number)
          }}
        >
          {number}
        </Button>
      ))}
    </div>
  )
}
