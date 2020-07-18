import React from "react";
import "./PreviousTurnBox.css";
import TeamBox from "./TeamBox";

const PreviousTurnBox = ({
  playerName,
  teamColor,
  lastRoundSuccess,
  lastPrompt
}) => {
  return  (
  <TeamBox
    backgroundColor="var(--color__foreground)"
    teamName="PREVIOUS TURN"
  >
    <div>
      <div>
        PLAYER
      </div>
      <div 
      >

      </div>


    </div>




  </TeamBox>
  )
}

export default PreviousTurnBox;