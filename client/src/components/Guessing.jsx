import React from "react";

import TimerWidget from "./TimerWidget";
import "./Guessing.css";

function Guessing({
  actorUp,
  color,
  myTeam,
  onTimesUpClick,
  countdown,
  percentage,
}) {
  const actionText = myTeam
    ? "Guess correctly before time is up! ⏰"
    : "You can relax this turn 😎";

  return (
    <div className="guessing">
      <h1 className="text__all-caps text__heading text__bold" style={{ color }}>
        {actorUp}
      </h1>
      <h3 className="text__heading text__bold">Is Acting!</h3>

      <p className="guessing__action-text">{actionText}</p>
      <div className="guessing__timer">
        <TimerWidget
          countdown={countdown}
          percentage={percentage}
          size="large"
          color={color}
          onTimerEnd={onTimesUpClick}
        />
      </div>
    </div>
  );
}

export default Guessing;
