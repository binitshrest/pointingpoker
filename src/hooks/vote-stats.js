import { useVotes } from "./votes.js"

export function useVoteStats() {
  const { voteValues, display, users } = useVotes()

  let averageVote
  let modeVote = []
  let consensus = false
  let minMaxVote = {}

  if (display && voteValues.length > 1) {
    averageVote = getAverage(voteValues)
    modeVote = transformMode(getMode(voteValues), voteValues.length)
    consensus = isAllEqual(voteValues)
    minMaxVote = getMinMaxVote(users)
  }

  return { averageVote, modeVote, consensus, minMaxVote }
}

function getAverage(numbers) {
  return Number(
    (
      numbers.reduce((total, number) => total + number, 0) / numbers.length
    ).toFixed(2),
  )
}

function getMode(numbers) {
  let mode = []
  const frequencyMap = {}
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

function transformMode(mode, numberOfVotes) {
  // When every one votes uniquely
  if (numberOfVotes === mode.length) {
    return ""
  }

  return transformArrayToString(mode)
}

function isAllEqual(list) {
  return list.every((number) => number === list[0])
}

function getMinMaxVote(users) {
  let minVote = Number.POSITIVE_INFINITY
  let minVoters = []
  let maxVote = Number.NEGATIVE_INFINITY
  let maxVoters = []

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

  minVoters = transformArrayToString(minVoters)
  maxVoters = transformArrayToString(maxVoters)

  return { minVote, minVoters, maxVote, maxVoters }
}

function transformArrayToString(array) {
  return array.join(", ").replace(/,([^,]+)$/, " and $1")
}
