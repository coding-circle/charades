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
          setTime(turnDurationSeconds + secondsUntilTurn);
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

  const countdownText = [null, "Go!", "Set!", "Ready!"][
    Math.ceil(countdownTime / 10)
  ];

  // get time as minutes and seconds
  const timeSeconds =
    time !== null ? Math.ceil(time / 10) : turnDurationSeconds / 10;

  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds - minutes * 60;

  const str_pad_left = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length);

  const finalTime = minutes + ":" + str_pad_left(seconds, "0", 2);

  const percentage = time / turnDurationSeconds;

  return {
    countdown: countdownText || finalTime,
    percentage: time === null ? 1 : percentage,
  };
};
