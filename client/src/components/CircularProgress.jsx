// reference: https://github.com/dastasoft/react-ui-components/blob/master/src/components/CircleProgressBar
import React, { useState, useEffect } from "react";

import "./CircularProgress.css";

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: "0 0 38 38",
  x: "19",
  y: "19",
  radio: "15.91549430918954",
};

const CircleProgressBar = ({
  strokeColor = "#2d9cdb",
  strokeWidth,
  percentage,
  trailStrokeWidth,
  trailSpaced = false,
  innerText = "",
}) => {
  const progressBar = percentage * 100;

  return (
    <svg viewBox={circleConfig.viewBox}>
      <circle
        className="donut-ring"
        cx={circleConfig.x}
        cy={circleConfig.y}
        r={circleConfig.radio}
        fill="transparent"
        stroke={strokeColor}
        strokeWidth={trailStrokeWidth}
        strokeDasharray={trailSpaced ? 1 : 0}
      />

      <circle
        className="donut-segment"
        cx={circleConfig.x}
        cy={circleConfig.y}
        r={circleConfig.radio}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeDasharray={`${progressBar} ${100 - progressBar}`}
        strokeDashoffset={INITIAL_OFFSET}
      />

      <g className="chart-text">
        <text x="50%" y="50%" className="chart-label">
          {innerText}
        </text>
      </g>
    </svg>
  );
};

export default CircleProgressBar;
