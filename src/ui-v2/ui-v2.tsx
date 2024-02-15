import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { useVoteStats } from "@/hooks/vote-stats"
import { useLoading } from "@/hooks/loading"
import { cn } from "@/utils/cn"
import { Nav } from "./components/nav"
import { VoteButtons } from "./components/vote-buttons"
import { DisconnectedDrawerDialog } from "./components/disconnected-drawer-dialog"
import { NameDrawerDialog } from "./components/name-drawer-dialog"
import { VoteOptionsDrawerDialog } from "./components/vote-options-drawer-dialog"
import { VotesGraph } from "./components/votes-graph"
import { Votes } from "./components/votes"

export default function UIV2() {
  const { width, height } = useWindowSize()
  const { consensus } = useVoteStats()
  const loading = useLoading()
  const [isConfettiVisible, setIsConfettiVisible] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (consensus) {
      setIsConfettiVisible(true)
      timer = setTimeout(() => {
        setIsConfettiVisible(false)
      }, 1000 * 10)
    } else {
      setIsConfettiVisible(false)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [consensus])

  return (
    <>
      <div
        className={cn(
          "grid grid-rows-[auto_1fr] place-items-center h-dvh",
          loading && "cursor-progress",
        )}
      >
        <Nav />
        <div className="flex flex-col gap-6 my-8 mx-4 max-w-screen-md">
          <VoteButtons />
          <Votes />
          <VotesGraph />
        </div>
      </div>
      {isConfettiVisible && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          onConfettiComplete={(confetti) => confetti?.reset()}
        />
      )}
      <DisconnectedDrawerDialog />
      <NameDrawerDialog />
      <VoteOptionsDrawerDialog />
    </>
  )
}

// [ ]: Dialog stuff
// [ ]: option for feedback
// [ ]: dark mode
