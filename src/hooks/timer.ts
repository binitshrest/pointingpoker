import { useEffect, useState } from "react"
import { DateTime } from "luxon"

const ONE_SECOND: number = 1 * 1000
const ONE_HOUR = 1 * 60 * 60 * 1000

export function useTimer(startTime: number): string {
  const [timer, setTimer] = useState("00:00")

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeElapsed = DateTime.now().setZone("UTC").minus(startTime)
      setTimer(
        timeElapsed.toLocaleString({
          hour: timeElapsed.toMillis() >= ONE_HOUR ? "numeric" : undefined,
          minute: "numeric",
          second: "numeric",
          hourCycle: "h23",
        }),
      )
    }, ONE_SECOND)

    return () => {
      clearInterval(intervalId)
    }
  })

  return timer
}
