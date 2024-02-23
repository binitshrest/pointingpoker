import { isNewPlayer } from "@/utils/misc"
import { Alert, AlertDescription } from "./ui/alert"
import { HelpCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { setNameDrawerDialogOpen } from "./name-drawer-dialog"
import { currentUser } from "@/utils/firebase"

export function NewPlayerHint() {
  const [showHint, setShowHint] = useState(isNewPlayer())

  useEffect(() => {    
    setShowHint(isNewPlayer())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.displayName])

  if (!showHint) return null

  return (
    <Alert variant="secondary" className="sm:w-full">
      <HelpCircle className="h-4 w-4" />
      <AlertDescription>
        Do you want to change your name?
        <Button
          variant="link"
          className="p-0 pl-2 h-min"
          onClick={() => {
            setNameDrawerDialogOpen(true)
          }}
        >
          Yes
        </Button>{" "}
        /{" "}
        <Button
          variant="link"
          className="p-0 h-min"
          onClick={() => {
            setShowHint(false)
          }}
        >
          No
        </Button>
      </AlertDescription>
    </Alert>
  )
}
