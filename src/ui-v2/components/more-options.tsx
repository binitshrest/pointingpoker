import { useState } from "react"
import { MoreVertical } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { clearVotes } from "@/utils/rtdb"
import { EditNameDialog } from "./edit-name-dialog"

export function MoreOptions() {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={clearVotes}>Clear Votes</DropdownMenuItem>
        <DropdownMenuItem>Change Vote Options</DropdownMenuItem>
        <EditNameDialog setDropdownMenuOpen={setOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
