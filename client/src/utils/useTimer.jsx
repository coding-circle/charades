/**
 * @file useTimer.jsx
 * React hook for calculating the turn timer.
 * Uses 10th of a second intervals so timer
 * percentage changes will visually look smooth.
 *
 * reference:
 *  https://github.com/thibaultboursier/use-timer/
 *  https://stackoverflow.com/questions/53891790/make-javascript-interval-synchronize-with-actual-time
 */

import { useEffect, useState, useMemo, useRef } from "react";
import { useServerTime } from "./useServerTime";

export const useTimer = ({ startTime, turnDurationSeconds }) => {
  const [timer, setTimer] = useState({
    countdown: null,
    percentage: null,
  });

  const isActive = useRef(false);

  const startTimeUnix = new Date(startTime).getTime();

  // difference in Date.now() between client and server
  const { timeDiscrepancy } = useServerTime();

  const endTime = useMemo(() => {
    const endTimeUnix =
      startTimeUnix + turnDurationSeconds * 1000 + timeDiscrepancy;

    // rounds time down to whole seconds for simplicity.
    return 1000 * Math.floor(endTimeUnix / 1000 + 0.1);
  }, [startTimeUnix, turnDurationSeconds, timeDiscrepancy]);

  useEffect(() => {
    isActive.current = false;

    setTimeout(() => {
      setTimer({
        countdown: null,
        percentage: null,
      });
    }, 0);
  }, [startTime, turnDurationSeconds]);

  useEffect(() => {
    // instead of using setInterval, which is unreliable when switching windows
    // or when devices reallocate resources. We sync timer at every interval.
    function oncePerSecondAnim() {
      const frameFunc = () => {
        // get the current time rounded down
        // to a 10th of a second (with a 10% margin)
        const now = 100 * Math.floor(Date.now() / 100 + 0.1);

        const countdown = (endTime - now) / 1000;
        const percentage = 1 - countdown / (turnDurationSeconds + 1);

        setTimer({
          countdown,
          percentage: Math.max(0, Math.min(1, percentage)),
        });

        if (countdown > 0 && isActive.current) {
          // wait for the next 10th of a second
          setTimeout(() => timerFunc(), now + 100 - Date.now());
        }
      };

      const timerFunc = function () {
        requestAnimationFrame(frameFunc);
      };

      timerFunc();
    }

    if (!isActive.current && startTime) {
      isActive.current = true;
      oncePerSecondAnim();
    }
  }, [timer, setTimer, endTime, turnDurationSeconds, startTime]);

  // calculate countdown
  const countdownMax = Math.min(timer.countdown, turnDurationSeconds);

  const minutes = Math.max(0, Math.floor(countdownMax / 60));
  const seconds = Math.max(0, Math.floor(countdownMax - minutes * 60));

  const prefixSecondsWithZero = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length);

  const finalTime = minutes + ":" + prefixSecondsWithZero(seconds, "0", 2);

  // these timer.percentage && and timer.countdown && below prevent
  // it from flashing in the beginning. Kinda a hacky fix but for now
  // is acceptable.

  return {
    countdown: finalTime,
    percentage: timer.percentage === null ? 0 : timer.percentage,
  };
};
