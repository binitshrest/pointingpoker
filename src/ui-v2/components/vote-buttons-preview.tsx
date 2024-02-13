import { Button } from "./ui/button"

type VoteButtonsPreviewProps = {
  voteValues: number[]
}

export function VoteButtonsPreview({ voteValues }: VoteButtonsPreviewProps) {
  return (
    <div>
      <h3 className="font-semibold tracking-tight mb-2">Preview</h3>
      <div className="flex flex-wrap gap-2">
        {voteValues.map((number) => (
          <Button
            key={number}
            variant="outline"
            size="lg"
            className="flex-grow"
          >
            {number}
          </Button>
        ))}
      </div>
    </div>
  )
}
