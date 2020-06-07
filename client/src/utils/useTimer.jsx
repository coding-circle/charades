// adapted from https://github.com/thibaultboursier/use-timer/
import { useEffect, useState, useMemo } from "react";

export const useTimer = ({ startTime, turnDurationSeconds }) => {
  // 3, 2, 1, 0 before turn starts
  const [countdownTime, setCountdownTime] = useState(null);
  // 90, 89, ... starting at turnDurationSeconds
  const [time, setTime] = useState(null);

  const endTime = useMemo(() => (startTime + turnDurationSeconds) * 1000, [
    startTime,
    turnDurationSeconds,
  ]);

  turnDurationSeconds *= 10;

  useEffect(() => {
    if (!startTime) {
      return setTime(null);
    }

    const currentTime = Date.now();

    // sync time intervals
    if (time === null && countdownTime === null) {
      if (startTime >= currentTime) {
        const secondsUntilTurn = Math.floor((startTime - currentTime) / 100); // 8000
        const difference = startTime - currentTime - secondsUntilTurn * 100;

        setTimeout(() => {
          setCountdownTime(secondsUntilTurn);
        }, difference);
      } else {
        const secondsUntilTurn = Math.floor((startTime - currentTime) / 100); // 8000
        const difference = startTime - currentTime - secondsUntilTurn * 100;

        setTimeout(() => {
          setTime(Math.min(endTime, turnDurationSeconds + secondsUntilTurn));
        }, difference);
      }
    }
  }, [startTime, turnDurationSeconds, countdownTime, time]);

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
      }, 100);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [time, countdownTime, endTime, turnDurationSeconds]);

  console.log(countdownTime);

  const countdownText = [null, "Go!", "Set!", "Ready!"][
    Math.ceil(countdownTime / 10)
  ];

  // get time as minutes and seconds
  const timeSeconds =
    time !== null ? Math.ceil(time / 10) : turnDurationSeconds / 10;

  const minutes = Math.max(0, Math.floor(timeSeconds / 60));
  const seconds = Math.max(0, timeSeconds - minutes * 60);

  const prefixSecondsWithZero = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length);

  const finalTime = minutes + ":" + prefixSecondsWithZero(seconds, "0", 2);

  const percentage = Math.min(1, 1 - time / turnDurationSeconds);

  return {
    countdown: countdownText || finalTime,
    percentage: time === null ? 0 : percentage,
  };
};
