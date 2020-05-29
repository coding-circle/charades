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
    <li class={itemClasses}>
      {host && (
        <div class="player__badge player__badge--host text__all-caps text__small text__bold"></div>
      )}
      <div
        class="player__name text__all-caps text__bold"
        style={{ color: color }}
      >{playerName}</div>
      {(actorUp || onDeck) && (
        <div
          class={badgeClasses}
          style={{ background: onDeck ? color : 'var(--color__foreground)' }}
        ></div>
      )}
    </li>
  );
};

export default Player;


