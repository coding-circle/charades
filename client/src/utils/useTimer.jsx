// adapted from https://github.com/thibaultboursier/use-timer/
import { useEffect, useState, useMemo } from "react";

export const useTimer = ({ startTime, turnDurationSeconds }) => {
  // 3, 2, 1, 0 before turn starts
  const [countdownTime, setCountdownTime] = useState(null);
  // 90, 89, ... starting at turnDurationSeconds
  const [time, setTime] = useState(null);

  const endTime = useMemo(() => startTime + turnDurationSeconds * 1000, [
    startTime,
    turnDurationSeconds,
  ]);

  useEffect(() => {
    if (!startTime) {
      return setTime(null);
    }

    const currentTime = Date.now();

    // sync time intervals
    if (time === null && countdownTime === null) {
      if (startTime >= currentTime) {
        const secondsUntilTurn = Math.floor((startTime - currentTime) / 1000); // 8000
        const difference = startTime - currentTime - secondsUntilTurn * 1000;

        setTimeout(() => {
          setCountdownTime(secondsUntilTurn);
        }, difference);
      } else {
        const secondsUntilTurn = Math.floor((startTime - currentTime) / 1000); // 8000
        const difference = startTime - currentTime - secondsUntilTurn * 1000;

        setTimeout(() => {
          setTime(turnDurationSeconds + secondsUntilTurn);
        }, difference);
      }
    }
  }, [startTime, turnDurationSeconds]);

  useEffect(() => {
    let intervalId;
    const currentTime = Date.now();

    if (currentTime < endTime) {
      intervalId = setInterval(() => {
        // countdown is running
        if (countdownTime > 0) {
          setCountdownTime((previousTime) => previousTime - 1);

          // countdown ended
        } else if (countdownTime === 0) {
          setTime(turnDurationSeconds);
          setCountdownTime(null);

          // time is running
        } else if (time > 0) {
          setTime((previousTime) => previousTime - 1);

          // time ended
        } else if (intervalId) {
          clearInterval(intervalId);
        }
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [time, countdownTime]);

  const countdownTimeToShow = countdownTime <= 3 ? countdownTime : null;

  return [time, countdownTimeToShow];
};
