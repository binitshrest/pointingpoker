import { Button } from "./ui/button"
import { clearVotes } from "@/utils/rtdb"

export function VoteActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="lg"
        className="flex-grow"
        onClick={clearVotes}
      >
        Clear Votes
      </Button>
      <Button variant="outline" size="lg" className="flex-grow">
        Change Vote Options
      </Button>
    </div>
  )
}
