import { useSyncExternalStore } from "react"

type UIVersion = "v1" | "v2"

export function useUI() {
  const setUIVersion = (newValue: UIVersion) => {
    localStorage.setItem("ui", newValue)
    dispatchEvent(new StorageEvent("storage", { key: "ui", newValue }))
  }

  const getSnapshot = () => localStorage.getItem("ui") as UIVersion

  if (!getSnapshot()) {
    localStorage.setItem("ui", "v1")
  }

  const subscribe = (listener: () => void) => {
    addEventListener("storage", listener)
    return () => removeEventListener("storage", listener)
  }

  const uiVersion = useSyncExternalStore(subscribe, getSnapshot)

  return [uiVersion, setUIVersion] as const
}
