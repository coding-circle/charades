import React from "react";
import "./TeamBox.css";
import { Button } from "./index";

const TeamBox = ({
  className,
  teamName,
  children,
  myTeam,
  color,
  fullHeight,
  onRenameClick,
}) => {
  const classes = `team-box
  ${className || ""} 
  ${fullHeight ? "team-box--full-height" : ""}`;

  return (
    <>
      <div className={classes}>
        <div className="team-box__header">
          <div
            className="team-box__team-label text__all-caps text__heading text__bold"
            style={{ background: color }}
          >
            {teamName}
          </div>
          {myTeam && (
            <Button
              onClick={onRenameClick}
              type="secondary"
              className="team-box__rename-button"
            >
              Rename?
            </Button>
          )}
        </div>
        <div className="team-box__body" style={{ background: color }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default TeamBox;
