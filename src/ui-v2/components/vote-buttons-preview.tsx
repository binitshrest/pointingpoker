import { Button } from "./ui/button"

interface VoteButtonsPreviewProps extends React.ComponentProps<"div"> {
  voteValues: number[]
}

export function VoteButtonsPreview({ voteValues, className }: VoteButtonsPreviewProps) {
  const filteredVoteValues = voteValues.filter(Number.isFinite)
  if (!filteredVoteValues.length) return null

  return (
    <div className={className}>
      <h3 className="font-semibold tracking-tight mb-2">Preview</h3>
      <div className="flex flex-wrap gap-2">
        {filteredVoteValues.map((number, index) => (
          <Button key={index} variant="outline" size="lg" className="flex-grow">
            {number}
          </Button>
        ))}
      </div>
    </div>
  )
}
