import React, { useEffect, useState, useMemo } from "react";
import io from "socket.io-client";
import { useDebouncedCallback } from "use-debounce";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const Wrapper = (PartyComponent) =>
  function SocketHOC(props) {
    const [isActive, setIsActive] = useState(false);
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
    }, 1000);

    const socket = useMemo(
      () =>
        io(`${SOCKET_URL}${props.slug}`, {
          withCredentials: true,
        }),
      [props.slug]
    );

    useEffect(() => {
      if (!isActive) {
        socket.on("update", (res) => {
          setParty(res.party);
        });

        socket.on("point-at", ({ pointee, pointer }) => {
          cancel();

          setPointedAt({
            pointee,
            pointer,
          });

          debouncedClearPointedAt();
        });
      }

      socket.on("connect", () => {
        setIsActive(true);
      });
    }, [props, cancel, debouncedClearPointedAt, socket, isActive]);

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
        setParty={setParty}
        onPoint={handlePoint}
        pointedAt={pointedAt}
      />
    );
  };

export default Wrapper;
