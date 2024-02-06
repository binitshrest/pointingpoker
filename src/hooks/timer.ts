import { useEffect, useState } from "react"
import { DateTime } from "luxon"

const ONE_SECOND: number = 1000 * 1

export function useTimer(startTime: number): string {
  const [timer, setTimer] = useState("00:00:00")

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(
        DateTime.now()
          .setZone("UTC")
          .minus(startTime)
          .toLocaleString(DateTime.TIME_24_WITH_SECONDS),
      )
    }, ONE_SECOND)

    return () => {
      clearInterval(intervalId)
    }
  })

  return timer
}
