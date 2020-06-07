import React, { useEffect, useState } from "react";
import SocketHOC from "../../utils/SocketHOC";

import WaitingRoom from "./WaitingRoom";
import PromptWriting from "./PromptWriting";
import GamePlay from "./GamePlay";
import { useGamePhase } from "../../utils/useGamePhase";

// Logic for which game view and what what props are passed down is handled here.
function Party({ username, party, pointedAt, onPoint }) {
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
