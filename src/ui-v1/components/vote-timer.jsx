import { useTimer } from "../../hooks/timer"

export function VoteTimer() {
  const { timer } = useTimer()

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Timer</p>
      {timer}
    </div>
  )
}
