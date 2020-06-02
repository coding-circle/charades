import React from "react";
import "./TeamBox.css";
import Button from "./Button";

const TeamBox = ({
  className,
  teamName,
  children,
  myTeam,
  color,
  fullHeight,
}) => {
  const classes = `team-box
  ${className || ""} 
  ${fullHeight ? "team-box--full-height" : ""}`;

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
          <Button type="secondary" className="team-box__rename-button">
            Rename?
          </Button>
        )}
      </div>
      <div className="team-box__body" style={{ background: color }}>
        {children}
      </div>
    </div>
  );
};

export default TeamBox;
