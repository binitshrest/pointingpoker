import { useStore } from "../hooks/store.js";
import { useTimer } from "../hooks/timer.js";

export function VoteTimer() {
  const { startTime } = useStore();
  const timer = useTimer(startTime);

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Timer</p>
      {timer}
    </div>
  );
}
