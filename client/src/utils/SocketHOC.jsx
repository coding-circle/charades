import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const Wrapper = (PartyComponent) =>
  function SocketHOC(props) {
    const [party, setParty] = useState(props.party);

    useEffect(() => {
      const socket = io(`${SOCKET_URL}${props.slug}`);

      socket.on("connect", () => {
        console.log("*** socket connected ***");
      });

      socket.on("update", (res) => setParty(res.party));
    }, [props]);

    return <PartyComponent {...props} party={party} />;
  };

export default Wrapper;
