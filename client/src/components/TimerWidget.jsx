import React from "react";

import { Button } from "../components";
import { useTimer } from "../utils/useTimer";

function TimerWidget({ startTime, turnDurationSeconds }) {
  const [time, cancel] = useTimer({
    startTime: Date.now(),
    turnDurationSeconds: 90,
  });
  return (
    <>
      <h1>{time}</h1>
      <br />
      <Button onClick={cancel}>cancel</Button>
    </>
  );
}

export default TimerWidget;
