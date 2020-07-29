import React from "react";
import "./PreviousTurnBox.css";
import TeamBox from "./TeamBox";
import { SuccessMarker } from "../components";

const PreviousTurnBox = ({ author, color, success, prompt }) => {
  return (
    <TeamBox
      backgroundColor="var(--color__foreground)"
      teamName="PREVIOUS TURN"
    >
      <div className="previous-turn-box">
        <div className="previous-turn-box__player  text__all-caps text__heading text__bold">
          AUTHOR
          <span className="player__name" style={{ color: color }}>
            {author.slice(0, -7)}
          </span>
        </div>
        <div className="previous-turn-box__prompt">
          <div className="previous-turn-box__prompt-label text__all-caps text__heading text__bold">
            PROMPT
            <SuccessMarker wasSuccessful={success} />
          </div>
          <div>{prompt}</div>
        </div>
      </div>
    </TeamBox>
  );
};

export default PreviousTurnBox;
