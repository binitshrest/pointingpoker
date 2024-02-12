import { useStore } from "@/hooks/store"
import { Button } from "./ui/button"
import { vote } from "@/utils/rtdb"
import { MoreOptions } from "./more-options"
import { Separator } from "./ui/separator"

export function VoteButtons() {
  const { voteOptionsList, selectedVoteOptionsKey } = useStore()

  return (
    <div className="flex gap-2">
      <div className="flex flex-wrap gap-2">
        {Object.values(voteOptionsList[+selectedVoteOptionsKey]).map(
          (number) => (
            <Button
              key={number}
              variant="outline"
              size="lg"
              className="flex-grow"
              onClick={() => {
                vote(number)
              }}
            >
              {number}
            </Button>
          ),
        )}
      </div>
      <Separator orientation="vertical" className="h-[inherit] ml-5" />
      <MoreOptions />
    </div>
  )
}
