import { useSyncExternalStore } from "react"
import { onValue, get, child, ref, DataSnapshot } from "@firebase/database"
import { db, roomRef } from "../utils/firebase"
import { roomId } from "../utils/room-id"
import { updateDb } from "../utils/rtdb"
import { asyncQueue } from "./loading"

type LocalStore = {
  dbState: Room
  pendingUpdates: Pick<RoomUpdates, RoomUpdateUserVoteKey>
  currentVote: number
}

const roomSnapshot = (await asyncQueue.add(() =>
  get(child(ref(db), `rooms/${roomId}`)),
)) as DataSnapshot

const localStore: LocalStore = {
  dbState: roomSnapshot.val(),
  pendingUpdates: {},
  currentVote: 0,
}

function subscribe(callback: () => void): () => void {
  return onValue(roomRef, async (snapshot): Promise<void> => {
    localStore.dbState = snapshot.val()
    if (
      // To defer vote update until everyone has voted
      Object.values(localStore.dbState.users).every(({ hasVoted }) => hasVoted)
    ) {
      await updateDb(localStore.pendingUpdates)
      localStore.pendingUpdates = {}
    }

    callback()
  })
}

export function getStore(): Room {
  return localStore.dbState
}

export function useStore(): Room {
  return useSyncExternalStore(subscribe, getStore)
}

export function deferVoteUpdate(
  key: RoomUpdateUserVoteKey,
  value: number,
): void {
  localStore.pendingUpdates[key] = value
}

export function setCurrentVote(vote: number): void {
  localStore.currentVote = vote
}

export function getCurrentVote(): number {
  return localStore.currentVote
}
