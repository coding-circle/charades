import React from "react";
import "./Player.css";

const Player = ({ className, playerName, host, actorUp, onDeck, color }) => {
  const itemClasses = `player
  ${className || ""}`;

  const badgeClasses = `player__badge player__badge--status text__all-caps 
  text__small text__bold 
  ${actorUp && 'player__badge--status-actor-up'} 
  ${onDeck && 'player__badge--status-on-deck'}`;

  return (
    <li className={itemClasses}>
      {host && (
        <div className="player__badge player__badge--host text__all-caps text__small text__bold"></div>
      )}
      <div
        className="player__name text__all-caps text__heading text__bold"
        style={{ color: color }}
      >{playerName}</div>
      {(actorUp || onDeck) && (
        <div
          className={badgeClasses}
          style={{ background: onDeck ? color : 'var(--color__foreground)' }}
        ></div>
      )}
    </li>
  );
};

export default Player;


