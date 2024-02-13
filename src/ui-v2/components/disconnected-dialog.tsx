import { onValue, ref } from "@firebase/database"
import { db } from "@/utils/firebase"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { setupReconnection } from "@/utils/rtdb"

export function DisconnectedDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, ".info/connected"),
      async (snapshot) => {
        if (snapshot.val()) {
          setOpen(false)
          await setupReconnection()
        } else {
          setOpen(true)
        }
      },
    )

    return () => {
      setOpen(false)
      unsubscribe()
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent nonDismissable>
        <DialogHeader>
          <DialogTitle>Disconnected</DialogTitle>
        </DialogHeader>
        Hold on, it seems your connection has gotten lost in the mists of time.
        Fear not, brave adventurer, refresh the page and reconnect to the
        present!
      </DialogContent>
    </Dialog>
  )
}
