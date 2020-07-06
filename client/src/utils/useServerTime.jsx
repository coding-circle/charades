/**
 * @file useServerTime.jsx
 * React hook for getting server time and calculating
 * difference between client time and server time.
 *
 * unclear how much is necessary, but theoretically allows the timer to
 * function even if client time is dramatically different from server
 *
 * reference: https://stackoverflow.com/questions/10585910/sync-js-time-between-multiple-devices
 * note: based on the above link, but heavily modified to the
 * point of not being recognizably based on the above.
 * ¯\_(ツ)_/¯
 */
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://esc-charades.herokuapp.com/timesync";

export const useServerTime = () => {
  const [serverTime, setServerTime] = useState({
    serverTime: 0,
    timeDiscrepancy: 0,
  });

  useEffect(() => {
    const syncTime = async () => {
      const start = new Date().getTime();

      const { data } = await axios.get(API_URL);

      const latency = new Date().getTime() - start;

      // Set the time to the **slightly old** date sent from the
      // server, then adjust it to a good estimate of what the
      // server time is **right now**.
      const adjustedServerTime = new Date(data.serverTime);
      adjustedServerTime.setMilliseconds(
        adjustedServerTime.getMilliseconds() + latency / 2
      );

      setServerTime({
        serverTime: adjustedServerTime.getTime(),
        timeDiscrepancy: adjustedServerTime.getTime() - new Date().getTime(),
      });
    };

    syncTime();
  }, []);

  return serverTime;
};
