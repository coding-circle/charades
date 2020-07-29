import React from "react";
import { PreviousTurnBox } from "../components";

function Sandbox() {
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
