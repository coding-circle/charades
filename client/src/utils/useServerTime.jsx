import axios from "axios";

export const useServerTime = () => {
  let systemtime = new Date();

  const API_URL = process.env.REACT_APP_SOCKET_URL;

  const syncTime = async () => {
    console.log("syncing time");

    const start = new Date().getTime();
    const {
      data: { serverTime },
    } = await axios.get(`${API_URL}timesync`);

    const latency = new Date().getTime() - start;

    console.log("latency: ", latency);

    // Set the time to the **slightly old** date sent from the
    // server, then adjust it to a good estimate of what the
    // server time is **right now**.
    systemtime = new Date(serverTime);
    systemtime.setMilliseconds(systemtime.getMilliseconds() + latency / 2);
  };

  syncTime();

  window.addEventListener("pageshow", syncTime());

  return [systemtime.toString()];
};
