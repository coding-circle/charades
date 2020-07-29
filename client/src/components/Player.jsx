import React, { useState, useEffect } from "react";

import "./Player.css";
import YoureUp from "./YoureUp";
import Button from "./Button";
import api from "../utils/api";

const Player = ({
  className,
  youreUp,
  party,
  playerName,
  isHost,
  actorUp,
  onDeck,
  color,
  backgroundColor,
  isManagePlayers,
}) => {
  const itemClasses = `player
  ${className || ""}`;

  const badgeClasses = `player__badge player__badge--status text__all-caps 
  text__small text__bold 
  ${actorUp && "player__badge--status-actor-up"} 
  ${onDeck && "player__badge--status-on-deck"}`;

  const [preppedForRemoval, setPreppedForRemoval] = useState(false);

  useEffect(() => {
    setPreppedForRemoval(false);
  }, [isManagePlayers]);

  const handleRemovePlayer = async () => {
    await api.leaveParty({ slug: party.slug, username: playerName });
  };

  return (
    <li className={itemClasses}>
      <div
        className="player__item"
        style={{
          ...(backgroundColor && { backgroundColor }),
        }}
      >
        {isHost && (
          <div
            className="player__badge player__badge--host text__all-caps text__small text__bold"
            style={{
              ...(isManagePlayers && { color: "var(--color__foreground)" }),
              ...(isManagePlayers && {
                background: "var(--color__background)",
              }),
            }}
          ></div>
        )}
        <div
          className="player__name text__all-caps text__heading text__bold"
          style={{
            color,
          }}
        >
          {playerName.slice(0, -7)}
        </div>
        {(actorUp || onDeck) && (
          <div
            className={badgeClasses}
            style={{ background: onDeck ? color : "var(--color__foreground)" }}
          ></div>
        )}
        {isManagePlayers && !preppedForRemoval && (
          <Button
            icon="✕"
            className={badgeClasses}
            style={{
              color: "var(--color__foreground)",
              background: "var(--color__background)",
              border: "none",
              borderRadius: "1px",
              width: "110px",
              minHeight: "22px",
              whiteSpace: "nowrap",
            }}
            onClick={() => setPreppedForRemoval(true)}
          >
            REMOVE PLAYER
          </Button>
        )}
        {isManagePlayers && preppedForRemoval && (
          <Button
            className={badgeClasses}
            style={{
              color: "var(--color__foreground)",
              background: "var(--color__primary)",
              border: "none",
              borderRadius: "1px",
              width: "110px",
              minHeight: "22px",
              whiteSpace: "nowrap",
            }}
            onClick={handleRemovePlayer}
          >
            REALLY?
          </Button>
        )}
      </div>
      {youreUp && <YoureUp party={party} />}
    </li>
  );
};

export default Player;
