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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export function MoreDropdownMenu({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild onFocus={(event) => event.preventDefault()}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={className}
                aria-label="More Options"
              >
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>More options</TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
