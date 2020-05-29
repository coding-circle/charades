import React from "react";
import "./TeamBox.css";

const TeamBox = ({ className, teamName, children, myTeam, color }) => {
  const classes = `team-box
  ${className || ""}`;
  console.log(color)

  return (
    <div class={classes}>
      <div class="team-box__header">
        <div
          class="team-box__team-label text__all-caps text__heading text__bold"
          style={{ background: color }}
        >{teamName}</div>
        {myTeam && (
          <button class="team-box__rename-button button-secondary">Rename?</button>
        )}
      </div>
      <div
        class="team-box__body"
        style={{ background: color }}
      >
        {children}
      </div>
    </div>
  );
};

export default TeamBox;

