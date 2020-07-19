import React from "react";
import "./PreviousTurnBox.css";
import TeamBox from "./TeamBox";
import { SuccessMarker } from "../components";

const PreviousTurnBox = ({
  playerName,
  teamColor,
  lastRoundSuccess,
  lastPrompt,
}) => {

  return  (
  <TeamBox
    backgroundColor="var(--color__foreground)"
    teamName="PREVIOUS TURN"
  >
    <div className="previous-turn-box">
      <div className="previous-turn-box__player  text__all-caps text__heading text__bold">
        PLAYER
        <span style={{ color: teamColor }}>{playerName}</span>
      </div>
      <div className="previous-turn-box__prompt">
        <div className="previous-turn-box__prompt-label text__all-caps text__heading text__bold">
          PROMPT
          <SuccessMarker />
          </div>
        <div>{lastPrompt}</div>
        
      </div>

    </div>

  </TeamBox>
  )
}

export default PreviousTurnBox;