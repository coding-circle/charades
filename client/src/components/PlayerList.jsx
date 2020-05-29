import React from "react";
import Player from "./Player";
import "./PlayerList.css";

const PlayerList = ({ className, host, players, actorUp, onDeck, color }) => {
  const classes = `player-list
  ${className || ""}`;

  return (
    <ul className={classes}>
      {players.map((playerName, index) => (
        <Player
          playerName={playerName}
          host={host === playerName}
          actorUp={actorUp === playerName}
          onDeck={onDeck === playerName}
          color={color}
          key={playerName + index}
        />
      ))}
    </ul>
  );
};

export default PlayerList;


