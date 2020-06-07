import React from "react";
import "./Pointing.css";

function Pointing({ party, teamPlayers, username, onPoint, color }) {
  const guessers = teamPlayers.filter((player) => {
    return player !== username;
  });

  return (
    <div className="pointing">
      {guessers.map((player) => (
        <PointingItem
          player={player}
          onPoint={onPoint}
          color={color}
          key={player}
        />
      ))}
    </div>
  );
}

export default Pointing;

function PointingItem({ player, onPoint, color }) {
  const handlePointingItemPress = () => {
    onPoint(player);
  };

  return (
    <div
      className="pointing-item"
      style={{ backgroundColor: color }}
      onClick={handlePointingItemPress}
    >
      <h4 className="text__all-caps text__heading text__bold">{player}</h4>
      <div className="pointing-item__pointer"></div>
    </div>
  );
}
