import {
  ref,
  serverTimestamp,
  update,
  push,
  onDisconnect,
} from "@firebase/database";
import { updateProfile } from "@firebase/auth";
import { asyncQueue } from "../hooks/loading.js";
import { deferUpdate, getStore, setCurrentVote } from "../hooks/store.js";
import { auth, currentUserId, db, roomRef } from "./firebase.js";
import { roomId } from "./room-id.js";

export async function vote(selectedOption) {
  try {
    // To defer vote update until everyone has voted
    deferUpdate(`users/${currentUserId}/vote`, selectedOption);
    // To show the current user their vote
    setCurrentVote(selectedOption);

    const updates = {
      [`users/${currentUserId}/hasVoted`]: true,
      timeTaken: serverTimestamp(),
    };
    await updateDb(updates);
  } catch (error) {
    console.error("Error in voting", error);
    throw error;
  }
}

export async function clearVotes() {
  try {
    await updateDb(getClearVotesUpdates());
  } catch (error) {
    console.error("Error in clearing votes", error);
    throw error;
  }
}

export async function selectVoteOptions(selectedVoteOptionsKey) {
  try {
    if (getStore().selectedVoteOptionsKey !== selectedVoteOptionsKey) {
      await updateDb({ selectedVoteOptionsKey, ...getClearVotesUpdates() });
    }
  } catch (error) {
    console.error("Error in selecting vote options", error);
    throw error;
  }
}

export async function createVoteOptions(newVoteOptions) {
  try {
    await asyncQueue.add(() =>
      update(push(ref(db, `rooms/${roomId}/voteOptionsList`)), newVoteOptions)
    );
  } catch (error) {
    console.error("Error in creating vote options", error);
    throw error;
  }
}

export async function setName(name) {
  try {
    if (!name || name === auth.currentUser.displayName) {
      return;
    }

    await asyncQueue.addAll([
      () =>
        updateProfile(auth.currentUser, {
          displayName: name,
        }),
      () => update(roomRef, { [`users/${currentUserId}/name`]: name }),
    ]);
  } catch (error) {
    console.error("Error while setting name", error);
    throw error;
  }
}

function getClearVotesUpdates() {
  const updates = { startTime: serverTimestamp(), timeTaken: 0 };
  for (const id of Object.keys(getStore().users)) {
    updates[`users/${id}/hasVoted`] = false;
  }

  return updates;
}

export async function updateDb(updates) {
  await asyncQueue.add(() => update(roomRef, updates));
}

export async function setupReconnection() {
  try {
    await updateDb({
      [`users/${currentUserId}`]: {
        vote: 0,
        hasVoted: false,
        name: auth.currentUser.displayName,
      },
    });
    // Delete user from db on disconnect
    await onDisconnect(
      ref(db, `rooms/${roomId}/users/${currentUserId}`)
    ).remove();
  } catch (error) {
    console.error("Error while setting up reconnection", error);
    throw error;
  }
}
