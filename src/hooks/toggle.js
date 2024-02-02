import { useState } from "react"

export function useToggle(defaultValue = false) {
  const [state, setState] = useState(defaultValue)

  const toggleState = () => {
    setState((currentState) => !currentState)
  }

  return [state, toggleState]
}
