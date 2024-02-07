declare interface RoomPrimitive {
  startTime: number | object // To handle firebase db serverTimestamp
  endTime: number | object
  selectedVoteOptionsKey: string
  voteOptionsList: {
    [key: number]: {
      [key: number]: number
    }
  }
}

declare type RoomUpdateUserVoteKey = `users/${string}/vote`

declare interface RoomUpdates extends RoomPrimitive {
  [key: `users/${string}/name`]: string
  [key: `users/${string}/hasVoted`]: boolean
  [key: `users/${string}/vote`]: number
}

declare interface Room extends RoomPrimitive {
  users: {
    [key: string]: {
      name: string
      hasVoted: boolean
      vote: number
    }
  }
}
