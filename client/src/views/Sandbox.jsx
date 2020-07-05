import React from "react";
// import { TimerWidget } from "../components";
import { useServerTime } from "../utils/useServerTime";

function Sandbox() {
  const [serverTime] = useServerTime();

  return (
    <div className="app__main">
      <h1> Timer Widget </h1>

      <p>{serverTime}</p>

      {/* <TimerWidget
        startTime={Date.now() + 4000}
        turnDurationSeconds={90}
        size="large"
        onTimerEnd={() => console.log("end")}
      /> */}
    </div>
  );
}

export default Sandbox;
