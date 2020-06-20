import React from "react";

import "./Turn.css";
import Acting from "./Acting";
import Guessing from "./Guessing";

function Turn({
  party,
  username,
  turn,
  actorUp,
  color,
  teamPlayers,
  onPoint,
  onEndTurnClick,
  onTimesUpClick,
  onPostTurnModalOpen,
}) {
  const acting = actorUp === username;

  return (
    <div className="turn">
      {acting ? (
        <Acting
          party={party}
          turn={turn}
          username={username}
          color={color}
          teamPlayers={teamPlayers}
          onPoint={onPoint}
          onEndTurnClick={onEndTurnClick}
          onTimesUpClick={onTimesUpClick}
        />
      ) : (
        <Guessing
          party={party}
          turn={turn}
          actorUp={actorUp}
          color={color}
          myTeam={teamPlayers.includes(username)}
          onTimesUpClick={onTimesUpClick}
        />
      )}
    </div>
  );
}

export default Turn;
