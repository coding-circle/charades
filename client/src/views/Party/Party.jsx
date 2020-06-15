import React, { useState, useEffect } from "react";
import SocketHOC from "../../utils/SocketHOC";
import useNoSleep from "use-no-sleep";

import WaitingRoom from "./WaitingRoom";
import PromptWriting from "./PromptWriting";
import GamePlay from "./GamePlay";
import { useGamePhase } from "../../utils/useGamePhase";
import api from "../../utils/api";

function Party({ username, party, setParty, pointedAt, onPoint }) {
  const [isPreventingSleep, setIsPreventingSleep] = useState(false);

  useNoSleep(isPreventingSleep);

  useEffect(() => {
    const handleFocus = () => {
      setIsPreventingSleep(true);
    };

    const handleVisibilityChange = async (evt) => {
      if (!evt.target.hidden) {
        const newParty = await api.getParty({ slug: party.slug });
        setParty(newParty);
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [party.slug, setParty]);

  const [gamePhase] = useGamePhase(party);

  const props = {
    party,
    username,
    pointedAt,
    onPoint,
  };

  const views = {
    "pre-game": <WaitingRoom {...props} />,
    "prompt-writing": <PromptWriting {...props} />,
    "game-play": <GamePlay {...props} />,
  };

  return <>{views[gamePhase]}</>;
}

export default SocketHOC(Party);
