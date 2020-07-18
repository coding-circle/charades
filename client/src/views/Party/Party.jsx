import React, { useEffect } from "react";
import SocketHOC from "../../utils/SocketHOC";

import WaitingRoom from "./WaitingRoom";
import PromptWriting from "./PromptWriting";
import GamePlay from "./GamePlay";
import { useGamePhase } from "../../utils/useGamePhase";
import api from "../../utils/api";

function Party({ username, party, setParty, pointedAt, onPoint }) {
  useEffect(() => {
    const handleVisibilityChange = async (evt) => {
      const newParty = await api.getParty({ slug: party.slug });
      setParty(newParty);
    };

    window.addEventListener("focus", handleVisibilityChange);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleVisibilityChange);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handleVisibilityChange);
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
