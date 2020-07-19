import React from "react";
import { PreviousTurnBox } from "../components";

function Sandbox() {
  return (
    <div className="app_main">
      <h1> PreviousTurnBox </h1>
      <PreviousTurnBox
        playerName="george"
        teamColor="red"
        lastRoundSuccess={true}
        lastPrompt="fig tree"
      />
    </div>
  );
}

export default Sandbox;
