import { useEffect, useState } from "react"
import { DateTime } from "luxon"
import { useStore } from "./store"
import { useVotes } from "./votes"

const ONE_SECOND: number = 1000
const ONE_HOUR = 60 * 60 * 1000

export function useTimer(): { timer: string; isTimerStopped: boolean } {
  const [timer, setTimer] = useState("00:00")
  const { startTime, endTime } = useStore()
  const { display } = useVotes()

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const tick = () => {
      const timeElapsed = DateTime.now().setZone("UTC").minus(startTime)
      setTimer(
        timeElapsed.toLocaleString({
          hour: timeElapsed.toMillis() >= ONE_HOUR ? "numeric" : undefined,
          minute: "numeric",
          second: "numeric",
          hourCycle: "h23",
        }),
      )

      if (display && endTime) return

      timeout = setTimeout(() => {
        tick()
      }, ONE_SECOND)
    }

    tick()

    return () => {
      clearTimeout(timeout)
    }
  }, [display, endTime, startTime])

  return { timer, isTimerStopped: display && !!endTime }
}
