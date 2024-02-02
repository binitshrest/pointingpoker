import { useEffect, useRef } from "react"
import { ref, onValue } from "@firebase/database"
import { db } from "../utils/firebase.js"
import { setupReconnection } from "../utils/rtdb.js"

const connectedRef = ref(db, ".info/connected")

export function DisconnectedDialog() {
  const dialogRef = useRef()

  useEffect(() => {
    const dialog = dialogRef.current
    const unsubscribe = onValue(connectedRef, async (snap) => {
      if (snap.val()) {
        dialog?.close()
        await setupReconnection()
      } else {
        dialog?.showModal()
      }
    })

    return () => {
      dialog?.close()
      unsubscribe()
    }
  }, [])

  return (
    <dialog ref={dialogRef} className="nes-dialog">
      <p className="title">Disconnected</p>
      <p>Refreshing can help sometimes :)</p>
    </dialog>
  )
}
