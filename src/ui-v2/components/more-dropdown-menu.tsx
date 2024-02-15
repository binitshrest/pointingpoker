import { MoreVertical } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { clearVotes } from "@/utils/rtdb"
import { setNameDrawerDialogOpen } from "./name-drawer-dialog"
import { setVoteOptionsDrawerDialogOpen } from "./vote-options-drawer-dialog"

export function MoreDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={clearVotes}>Clear Votes</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setVoteOptionsDrawerDialogOpen(true)
          }}
        >
          Change Vote Options
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setNameDrawerDialogOpen(true)
          }}
        >
          Edit Username
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
