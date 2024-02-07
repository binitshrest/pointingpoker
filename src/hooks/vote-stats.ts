import { useVotes } from "./votes"

type MinMaxVotes = {
  minVote: number
  minVoters: string
  maxVote: number
  maxVoters: string
}

export function useVoteStats(): {
  averageVote: number | false
  modeVote: string | false
  consensus: boolean
  minMaxVotes: MinMaxVotes
} {
  const { voteValues, display, users } = useVotes()

  let averageVote: number | false = false
  let modeVote: string | false = false
  let consensus = false
  let minMaxVotes = {} as MinMaxVotes

  if (display && voteValues.length > 1) {
    averageVote = getAverage(voteValues)
    modeVote = transformMode(getMode(voteValues), voteValues.length)
    consensus = isAllEqual(voteValues)
    minMaxVotes = getMinMaxVotes(users)
  }

  return { averageVote, modeVote, consensus, minMaxVotes }
}

function getAverage(numbers: number[]): number {
  return Number(
    (
      numbers.reduce((total, number) => total + number, 0) / numbers.length
    ).toFixed(2),
  )
}

function getMode(numbers: number[]): number[] {
  let mode: number[] = []
  const frequencyMap: { [key: number]: number } = {}
  let maxFrequency = 0

  for (const number of numbers) {
    frequencyMap[number] = (frequencyMap[number] || 0) + 1
    if (maxFrequency < frequencyMap[number]) {
      maxFrequency = frequencyMap[number]
      mode = [number]
    } else if (maxFrequency === frequencyMap[number]) {
      mode.push(number)
    }
  }

  return mode
}

function transformMode(mode: number[], numberOfVotes: number): string {
  // When every one votes uniquely
  if (numberOfVotes === mode.length) {
    return ""
  }

  return transformListToString(mode)
}

function isAllEqual(numbers: number[]): boolean {
  return numbers.every((number) => number === numbers[0])
}

function getMinMaxVotes(users: Room["users"]): MinMaxVotes {
  let minVote = Number.POSITIVE_INFINITY
  let minVoters: string[] | string = []
  let maxVote = Number.NEGATIVE_INFINITY
  let maxVoters: string[] | string = []

  for (const { vote, name } of Object.values(users)) {
    if (vote <= minVote) {
      if (vote < minVote) {
        minVote = vote
        minVoters = []
      }

      minVoters.push(name)
    }

    if (vote >= maxVote) {
      if (vote > maxVote) {
        maxVote = vote
        maxVoters = []
      }

      maxVoters.push(name)
    }
  }

  minVoters = transformListToString(minVoters)
  maxVoters = transformListToString(maxVoters)

  return { minVote, minVoters, maxVote, maxVoters }
}

function transformListToString(list: number[] | string[]): string {
  return list.join(", ").replace(/,([^,]+)$/, " and $1")
}
