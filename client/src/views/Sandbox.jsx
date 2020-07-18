import React from "react";
import { useTimer } from "../utils/useTimer";
import { TimerWidget } from "../components";

function Sandbox() {
  const { countdown, percentage } = useTimer({
    startTime: 1593982941592,
    turnDurationSeconds: 90,
  });

  return (
    <div className="app__main">
      <h1> Timer Widget </h1>

      <TimerWidget
        countdown={countdown}
        percentage={percentage}
        size="large"
        onTimerEnd={() => console.log("end")}
      />
    </div>
  );
}

export default Sandbox;
