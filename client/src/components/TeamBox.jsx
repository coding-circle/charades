import React from "react";
import "./TeamBox.css";

const TeamBox = ({ className, teamName, children, myTeam, color }) => {
  const classes = `team-box
  ${className || ""}`;

  const handleRenameClick = () => {
    console.log("rename");
  };

  return (
    <div className={classes}>
      <div className="team-box__header">
        <div
          className="team-box__team-label text__all-caps text__heading text__bold"
          style={{ background: color }}
        >
          {teamName}
        </div>
        {myTeam && (
          <button
            onClick={handleRenameClick}
            className="team-box__rename-button button-secondary"
          >
            Rename?
          </button>
        )}
      </div>
      <div className="team-box__body" style={{ background: color }}>
        {children}
      </div>
    </div>
  );
};

export default TeamBox;
