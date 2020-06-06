import React from "react";

import "./Turn.css";
import Acting from "./Acting";
import Guessing from "./Guessing";

function Turn({ party, username, turn, actorUp, color, players }) {
  const acting = actorUp === username;

  return (
    <div className="turn">
      {acting ? (
        <Acting />
      ) : (
        <Guessing
          party={party}
          turn={turn}
          actorUp={actorUp}
          color={color}
          myTeam={players.includes(username)}
        />
      )}
    </div>
  );
}

export default Turn;
