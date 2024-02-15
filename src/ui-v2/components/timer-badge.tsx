import { useTimer } from "@/hooks/timer"
import { Badge } from "./ui/badge"

export function TimerBadge() {
  const { timer, isTimerStopped } = useTimer()

  return (
    <Badge variant={isTimerStopped ? "default" : "secondary"} size="md">
      {timer}
    </Badge>
  )
}
