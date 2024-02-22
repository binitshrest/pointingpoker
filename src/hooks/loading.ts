import PQueue from "p-queue"
import { useSyncExternalStore } from "react"
import LogRocket from "logrocket"

let loading = false

// Used for global loading indicator on all async code
// asyncQueue has Infinity concurrency
export const asyncQueue = new PQueue()

asyncQueue.addListener("add", () => {
  loading = true
})

asyncQueue.addListener("idle", () => {
  loading = false
})

asyncQueue.addListener("error", (error) => {
  LogRocket.captureException(error, {
    extra: { errorMessage: "Error while executing function in async queue" },
  })
})

function subscribe(callback: () => void): () => void {
  asyncQueue.addListener("add", callback)
  asyncQueue.addListener("idle", callback)

  return () => {
    asyncQueue.removeListener("add", callback)
    asyncQueue.removeListener("idle", callback)
  }
}

function getLoading(): boolean {
  return loading
}

export function useLoading(): boolean {
  return useSyncExternalStore(subscribe, getLoading)
}
