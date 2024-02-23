import { onValue, ref } from "@firebase/database"
import { db } from "@/utils/firebase"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { setupReconnection } from "@/utils/rtdb"
import { useMedia } from "react-use"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer"

export function DisconnectedDrawerDialog() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMedia("(min-width: 768px)")

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

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent nonDismissable>
          <DialogHeader>
            <DialogTitle>Disconnected</DialogTitle>
          </DialogHeader>
          Hold on, it seems your connection has gotten lost in the mists of
          time. Fear not, brave adventurer, refresh the page and reconnect to
          the present!
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} dismissible={false}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Disconnected</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          Hold on, it seems your connection has gotten lost in the mists of
          time. Fear not, brave adventurer, refresh the page and reconnect to
          the present!
        </div>
      </DrawerContent>
    </Drawer>
  )
}
