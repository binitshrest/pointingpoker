import { initializeApp } from "@firebase/app"
import {
  child,
  connectDatabaseEmulator,
  get,
  getDatabase,
  ref,
  serverTimestamp,
  update,
} from "@firebase/database"
import {
  connectAuthEmulator,
  getAuth,
  signInAnonymously,
  updateProfile,
  User,
} from "@firebase/auth"
import { has } from "lodash-es"
import { Bugfender } from "@bugfender/sdk"
import { asyncQueue } from "../hooks/loading"
import { roomId } from "./room-id"

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099")
  connectDatabaseEmulator(db, "127.0.0.1", 9001)
}

let currentUser: User

try {
  await asyncQueue.add(() => signInAnonymously(auth))
  currentUser = auth.currentUser as User
  if (!currentUser.displayName) {
    await asyncQueue.add(() =>
      updateProfile(currentUser, {
        displayName: `player ${currentUser.uid.slice(0, 3)}`,
      }),
    )
  }
} catch (error) {
  Bugfender.error("Error while signing in anonymously", error)
  throw error
}

const currentUserId = currentUser.uid

const roomRef = ref(db, `rooms/${roomId}`)

// Setup room
try {
  const roomSnapshot = await asyncQueue.add(() =>
    get(child(ref(db), `rooms/${roomId}`)),
  )

  let updates: Partial<RoomUpdates> = {}
  if (!roomSnapshot?.exists()) {
    // Initializing room
    updates = {
      endTime: 0,
      voteOptionsList: {
        0: { ...[0.5, 1, 2, 3, 5, 8, 13, 20] },
        1: { ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
      selectedVoteOptionsKey: "0",
    }
  }

  if (!has(roomSnapshot?.val(), "users")) {
    // Set startTime if first user to join
    updates.startTime = serverTimestamp()
  }

  // Add current user
  updates[`users/${currentUserId}/name`] = currentUser.displayName as string
  updates[`users/${currentUserId}/hasVoted`] = false
  updates[`users/${currentUserId}/vote`] = 0

  await asyncQueue.add(() => update(roomRef, updates))
} catch (error) {
  Bugfender.error("Error while setting up room", error)
  throw error
}

export { db, currentUser, currentUserId, roomRef }
