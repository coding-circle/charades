import React from "react";
import "./Turn.css";

import { TimerWidget } from "./index";

function Turn({ party, turn }) {
  return (
    <div className="turn">
      <TimerWidget
        startTime={turn.startTime}
        turnDurationSeconds={party.settings.turnDurationSeconds}
      />
    </div>
  );
}

export default Turn;
