import { useState } from "react"

export function useToggle(defaultValue = false): [boolean, () => void] {
  const [state, setState] = useState(defaultValue)

  const toggleState = (): void => {
    setState((currentState) => !currentState)
  }

  return [state, toggleState]
}
