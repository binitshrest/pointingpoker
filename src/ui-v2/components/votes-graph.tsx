import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { currentUserId } from "@/utils/firebase"
import { getCurrentVote } from "@/hooks/store"
import { useVotes } from "@/hooks/votes"

export function VotesGraph() {
  const { users, display } = useVotes()

  const data = Object.entries(users)
  .map(([id, { name, hasVoted, vote }]) => {
    let label: string | number

    if (display) {
      label = vote
    } else if (id === currentUserId && hasVoted) {
      vote = label = getCurrentVote()
    } else {
      label = "?"
      vote = 0
    }

    return { name, vote, label, hasVoted }
  })
  .sort((a, b) => a.vote - b.vote)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width="100%" aspect={2.2}>
          <BarChart data={data} maxBarSize={32} margin={{ top: 32 }} key={Math.random()}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={16}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value, index) => data[index].hasVoted ? `${value} ✓` : value}
            />
            <YAxis
              stroke="#888888"
              fontSize={16}
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="vote"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            >
              <LabelList dataKey="label" position="top" fill="currentColor" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
