import React, { useState } from "react";
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

  const [pointPressed, setPointPressed] = useState(false);

  return (
    <div
      className={`
      pointing-item 
      ${pointPressed ? "pointing-item--active" : ""}
      `}
      style={{
        backgroundColor: color,
      }}
      onClick={handlePointingItemPress}
      onMouseDown={() => setPointPressed(true)}
      onTouchStart={() => setPointPressed(true)}
      onMouseUp={() => setPointPressed(false)}
      onTouchEnd={() => setPointPressed(false)}
    >
      <h4 className="text__all-caps text__heading text__bold">{player}</h4>
      <div className="pointing-item__pointer"></div>
    </div>
  );
}
