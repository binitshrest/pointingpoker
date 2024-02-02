import { useEffect, useState } from "react"
import { DateTime } from "luxon"

export function useTimer(startTime) {
  const [timer, setTimer] = useState("00:00:00")

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(
        DateTime.now()
          .setZone("UTC")
          .minus(startTime)
          .toLocaleString(DateTime.TIME_24_WITH_SECONDS),
      )
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  })

  return timer
}
