import React, { useEffect, useState } from "react";
import SocketHOC from "../../utils/SocketHOC";

import WaitingRoom from "./WaitingRoom";
import PromptWriting from "./PromptWriting";

// Logic for which game view and what what props are passed down is handled here.
function Party({ slug, username, party }) {
  const [activeView, setActiveView] = useState("pre-game");
  const [isHost, setIsHost] = useState(false);
  useEffect(() => {
    const { games } = party;

    // **pre-game lobby:**
    if (games.length === 0) {
      setActiveView("pre-game");
    }

    // **prompt-writing:**
    else if (games[games.length - 1].startTime === null) {
      setActiveView("prompt-writing");
    }

    // **game-play:**
    else if (
      games[games.length - 1].startTime &&
      games[games.length - 1].endTime === null
    ) {
      setActiveView("game-play");
    }

    // **post-game lobby**
    else if (games[games.length - 1].endTime !== null) {
      setActiveView("post-game");
    }

    if (party.host === username) {
      setIsHost(true);
    }
  }, [party]);

  const views = {
    "pre-game": <WaitingRoom party={party} isHost={isHost} />,
    "prompt-writing": <PromptWriting party={party} username={username} />,
    // "game-play": <GamePlay party={party} />,
  };

  return <>{views[activeView]}</>;
}

export default SocketHOC(Party);
