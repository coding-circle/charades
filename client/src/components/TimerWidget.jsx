import React from "react";

import { useTimer } from "../utils/useTimer";

function TimerWidget({ startTime, turnDurationSeconds }) {
  const [time, countdownTime] = useTimer({
    startTime: new Date(startTime).getTime(),
    turnDurationSeconds,
  });

  console.log(startTime, turnDurationSeconds);

  return (
    <>
      <h1>{countdownTime}</h1>
      <h1>{time}</h1>
    </>
  );
}

export default TimerWidget;
