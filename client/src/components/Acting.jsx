import React from "react";

import "./Acting.css";
import Pointing from "./Pointing";

function Acting({ party, turn, color, username, teamPlayers, onPoint }) {
  return (
    <div className="acting">
      <div className="acting__header">
        <div className="acting__header-text">
          <h1
            className="text__all-caps text__heading text__bold"
            style={{ color }}
          >
            {username}
          </h1>
          <h3 className="text__heading text__bold">Your Prompt Is:</h3>
        </div>
      </div>
      <div className="acting__prompt">
        <h1 className="acting__prompt-text">{turn.prompt}</h1>
      </div>
      <Pointing
        party={party}
        turn={turn}
        color={color}
        teamPlayers={teamPlayers}
        username={username}
        onPoint={onPoint}
      />
    </div>
  );
}

export default Acting;
