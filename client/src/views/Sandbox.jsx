import React from "react";
import { PreviousTurnBox } from "../components";

function Sandbox() {
  const { countdown, percentage } = useTimer({
    startTime: 1593982941592,
    turnDurationSeconds: 90,
  });

  return (
    <div className="app_main">
      <h1> PreviousTurnBox </h1>
      <PreviousTurnBox
        player="george"
        teamColor="red"
        success={false}
        prompt="fig tree"
      />
    </div>
  );
}

export default Sandbox;
