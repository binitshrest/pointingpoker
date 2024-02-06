import PQueue from "p-queue"
import { useSyncExternalStore } from "react"
import { Bugfender } from "@bugfender/sdk"

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
  Bugfender.error("Error while executing function in async queue", error)
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
