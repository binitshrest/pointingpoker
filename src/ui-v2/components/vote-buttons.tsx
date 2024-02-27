import { useMedia } from "react-use"
import { getCurrentVote, useStore } from "@/hooks/store"
import { vote } from "@/utils/rtdb"
import { cn } from "@/utils/cn"
import { currentUserId } from "@/utils/firebase"
import { MoreDropdownMenu } from "./more-dropdown-menu"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export function VoteButtons() {
  const { voteOptionsList, selectedVoteOptionsKey, users } = useStore()
  const isDesktop = useMedia("(min-width: 768px)")

  return (
    <div className="flex gap-2">
      <div className="flex flex-wrap gap-2">
        {Object.values(voteOptionsList[selectedVoteOptionsKey]).map(
          (number) => (
            <Button
              key={number}
              variant="outline"
              size="lg"
              className={cn(
                "flex-grow",
                users[currentUserId].hasVoted &&
                  getCurrentVote() === number &&
                  "ring-1 ring-current",
              )}
              onClick={() => {
                vote(number)
              }}
            >
              {number}
            </Button>
          ),
        )}
      </div>
      {isDesktop && (
        <>
          <Separator orientation="vertical" className="h-[inherit] ml-5" />
          <MoreDropdownMenu />
        </>
      )}
    </div>
  )
}
