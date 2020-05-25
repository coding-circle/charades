// adapted from https://github.com/thibaultboursier/use-timer/
import React, { useCallback, useEffect, useState } from "react";

const coundownTime = 5000;

export const useTimer = ({ startTime, turnDurationSeconds }) => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (!startTime) {
      return setTime(null);
    }

    const currentTime = Date.now();

    // sync interval

    // if () {

    // }
  }, [startTime, turnDurationSeconds]);

  const cancel = useCallback(() => {
    setTime(null);
  });

  return { time, cancel };
};
