import React, { useEffect } from "react";

import CircularProgress from "./CircularProgress";

function TimerWidget({
  countdown,
  percentage,
  size = "medium",
  color,
  onTimerEnd,
}) {
  useEffect(() => {
    if (percentage === 1) {
      onTimerEnd && onTimerEnd();
    }
  }, [onTimerEnd, percentage]);

  return (
    <>
      {/* small */}
      {size === "small" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              marginRight: "12px",
            }}
          >
            <CircularProgress
              strokeWidth={6}
              trailStrokeWidth={6}
              percentage={percentage}
              strokeColor={color}
            />
          </div>
          <h1 style={{ fontSize: "21px", fontWeight: 900, width: "52px" }}>
            {countdown}
          </h1>
        </div>
      )}

      {/* medium */}
      {size === "medium" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
            }}
          >
            <CircularProgress
              strokeWidth={6}
              trailStrokeWidth={6}
              percentage={percentage}
              innerText={countdown}
              strokeColor={color}
            />
          </div>
        </div>
      )}

      {/* medium */}
      {size === "large" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
            }}
          >
            <CircularProgress
              strokeWidth={5}
              trailStrokeWidth={5}
              percentage={percentage}
              innerText={countdown}
              strokeColor={color}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TimerWidget;
