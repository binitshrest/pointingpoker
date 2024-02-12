import { MoreVertical } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { clearVotes } from "@/utils/rtdb"

export function MoreOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={clearVotes}>Clear Votes</DropdownMenuItem>
        <DropdownMenuItem>Change Vote Options</DropdownMenuItem>
        <DropdownMenuItem>Edit Username</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
