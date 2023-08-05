import { useSyncExternalStore } from "react";
import { onValue, get, child, ref } from "@firebase/database";
import { db, roomRef } from "../utils/firebase.js";
import { roomId } from "../utils/room-id.js";
import { updateDb } from "../utils/rtdb.js";
import { asyncQueue } from "./loading.js";

const roomSnapshot = await asyncQueue.add(() =>
  get(child(ref(db), `rooms/${roomId}`))
);
const localStore = {
  dbState: roomSnapshot.val(),
  pendingUpdates: {},
  currentVote: 0,
};

function subscribe(callback) {
  return onValue(roomRef, async (snapshot) => {
    localStore.dbState = snapshot.val();
    if (
      // To defer vote update until everyone has voted
      Object.values(localStore.dbState.users).every(({ hasVoted }) => hasVoted)
    ) {
      await updateDb(localStore.pendingUpdates);
      localStore.pendingUpdates = {};
    }

    callback();
  });
}

export function getStore() {
  return localStore.dbState;
}

export function useStore() {
  return useSyncExternalStore(subscribe, getStore);
}

export function deferUpdate(key, value) {
  localStore.pendingUpdates[key] = value;
}

export function setCurrentVote(vote) {
  localStore.currentVote = vote;
}

export function getCurrentVote() {
  return localStore.currentVote;
}
