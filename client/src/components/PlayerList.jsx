import React from "react";
import Player from "./Player";
import "./PlayerList.css";

const PlayerList = ({
  className,
  username,
  party,
  host,
  players,
  actorUp,
  onDeck,
  color,
  backgroundColor,
  isManagePlayers,
}) => {
  const classes = `player-list
  ${className || ""}`;

  return (
    <ul className={classes}>
      {players.map((playerName, index) => (
        <Player
          party={party}
          username={username}
          playerName={playerName}
          isManagePlayers={isManagePlayers}
          isHost={playerName === host}
          actorUp={actorUp === playerName}
          onDeck={onDeck === playerName}
          youreUp={actorUp === username && actorUp === playerName}
          color={color}
          backgroundColor={backgroundColor}
          key={playerName + index}
        />
      ))}
    </ul>
  );
};

export default PlayerList;
