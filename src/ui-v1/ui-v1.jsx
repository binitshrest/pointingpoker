import styled, { createGlobalStyle } from "styled-components"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

import { VoteActions } from "./components/vote-actions.jsx"
import { VoteButtons } from "./components/vote-buttons.jsx"
import { VoteStats } from "./components/vote-stats.jsx"
import { Votes } from "./components/votes.jsx"
import { VoteTimer } from "./components/vote-timer.jsx"
import { DisconnectedDialog } from "./components/disconnected-dialog.jsx"
import { Header } from "./components/header.jsx"
import { useVotes } from "../hooks/votes.js"
import { useLoading } from "../hooks/loading.js"
import { useVoteStats } from "../hooks/vote-stats.js"

const GlobalStyle = createGlobalStyle`
	* {
		${({ $loading }) => $loading && "cursor: progress !important;"}
	}

	#host-ui-v1 {
		min-width: 320px;
		min-height: 100vh;
		display: grid;
		place-items: center;
    grid-template-rows: auto 1fr;
    font-family: "Press Start 2P", monospace;
    line-height: 1.5;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFklEQVRYR9WXURLDIAhE6/0PbSdOtUpcd1Gnpv1KGpTHBpCE1/cXq+vrMph7dGvXZTtpfW10DCA5jrH1H0Jhs5E0hnZdCR+vb5S8Nn8mQCeS9BdSalYJqMBjAGzq59xAESN7VFVUgV8AZB/dZBR7QTFDCqGquvUBVVoEtgIwpQRzmANSFHgWQKExHdIrPeuMvQNDarXe6nC/AutgV3JW+6bgqQLeV8FekRtgV+ToDKEKnACYKsfZjjkam7a0ZpYTytwmgainpC3HvwBocgKOxqRjehoR9DFKNFYtOwCGYCszobeCbl26N6yyQ6g8X/Wex/rBPsNEV6qAMaJPMynIHQCoSqS9JSMmwef51LflTgCRszU7DvAGiV6mHWfsaVUAAAAASUVORK5CYII=),auto;
	}

	.nes-btn {
		border-image-repeat: stretch ;
	}

  .nes-dialog {
    padding: 0;
    border-width: 0;
  }
  
  .nes-dialog>:last-child {
    padding: 1.5rem 2rem;
    border: 4px solid;
  }
`

const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  max-width: min(576px, calc(100vw - 32px));
  margin: 32px 16px;
`

export function UIV1() {
  const { width, height } = useWindowSize()
  const { display } = useVotes()
  const { consensus } = useVoteStats()
  const loading = useLoading()

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css"
        crossOrigin="anonymous"
      />
      <Header />
      <Container>
        <GlobalStyle $loading={loading} />
        <VoteButtons />
        <VoteActions />
        <Votes />
        {!display && <VoteTimer />}
        <VoteStats />
      </Container>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={consensus ? 500 : 0}
        onConfettiComplete={(confetti) => confetti.reset()}
      />
      <DisconnectedDialog />
    </>
  )
}
