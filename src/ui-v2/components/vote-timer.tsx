import { useStore } from "@/hooks/store"
import { useTimer } from "@/hooks/timer"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

export function VoteTimer() {
  const { startTime } = useStore()
  const timer = useTimer(startTime as number)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timer</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <Badge variant="outline" size="lg">
          {timer}
        </Badge>
      </CardContent>
    </Card>
  )
}
