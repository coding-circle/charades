import React from "react";
import Player from "./Player";
import "./PlayerList.css";

const PlayerList = ({
  className,
  username,
  party,
  players,
  actorUp,
  onDeck,
  isHost,
  color,
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
          isHost={isHost && playerName === username}
          actorUp={actorUp === playerName}
          onDeck={onDeck === playerName}
          youreUp={actorUp === username && actorUp === playerName}
          color={color}
          key={playerName + index}
        />
      ))}
    </ul>
  );
};

export default PlayerList;
