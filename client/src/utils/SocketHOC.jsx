import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDebouncedCallback } from "use-debounce";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const Wrapper = (PartyComponent) =>
  function SocketHOC(props) {
    const [party, setParty] = useState(props.party);
    const [pointedAt, setPointedAt] = useState({
      pointer: null,
      pointee: null,
    });

    const [debouncedClearPointedAt, cancel] = useDebouncedCallback(() => {
      setPointedAt({
        pointer: null,
        pointee: null,
      });
    }, 2000);

    const socket = io(`${SOCKET_URL}${props.slug}`);

    useEffect(() => {
      socket.on("connect", () => {});

      socket.on("update", (res) => setParty(res.party));

      socket.on("point-at", ({ pointee, pointer }) => {
        cancel();

        setPointedAt({
          pointee,
          pointer,
        });

        debouncedClearPointedAt();
      });
    }, [props, cancel, debouncedClearPointedAt, socket]);

    const handlePoint = (pointee) => {
      socket.emit("point-at", {
        pointer: props.username,
        pointee,
      });
    };

    return (
      <PartyComponent
        {...props}
        party={party}
        onPoint={handlePoint}
        pointedAt={pointedAt}
      />
    );
  };

export default Wrapper;
