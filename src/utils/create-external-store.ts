import { nanoid } from "nanoid"
// for storing primitive values externally
export function createExternalStore<T>(
  defaultValue: T,
): [(listener: () => void) => () => void, () => T, (newValue: T) => void] {
  let state = defaultValue
  const eventName = nanoid()

  const setState = (newValue: T) => {
    state = newValue
    window.dispatchEvent(new Event(eventName))
  }

  const getSnapshot = () => state

  const subscribe = (listener: () => void): (() => void) => {
    window.addEventListener(eventName, listener)
    return () => {
      window.removeEventListener(eventName, listener)
    }
  }

  return [subscribe, getSnapshot, setState]
}
