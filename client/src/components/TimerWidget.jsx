import React from "react";

import { useTimer } from "../utils/useTimer";

function TimerWidget({ startTime, turnDurationSeconds }) {
  const [time, countdownTime] = useTimer({
    startTime: (startTime = Date.now() + 5200),
    turnDurationSeconds: 120,
  });

  return (
    <>
      <h1>{countdownTime}</h1>
      <h1>{time}</h1>
    </>
  );
}

export default TimerWidget;
