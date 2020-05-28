import React, { useEffect, useState } from "react";
import SocketHOC from "../../utils/SocketHOC";

import WaitingRoom from "./WaitingRoom";
import PromptWriting from "./PromptWriting";
import GamePlay from "./GamePlay";

// Logic for which game view and what what props are passed down is handled here.
function Party({ slug, username, party, pointedAt, onPoint }) {
  const [activeView, setActiveView] = useState("pre-game");
  const [isHost, setIsHost] = useState(false);
  const [game, setGame] = useState({});

  useEffect(() => {
    const currentGame = party.games[party.games.length - 1];
    setGame(currentGame);

    // **pre-game lobby:**
    if (party.games.length === 0) {
      setActiveView("pre-game");
    }

    // **prompt-writing:**
    else if (currentGame.startTime === null) {
      setActiveView("prompt-writing");
    }

    // **game-play:**
    else if (currentGame.startTime && currentGame.endTime === null) {
      setActiveView("game-play");
    }

    // **post-game lobby**
    else if (currentGame.endTime !== null) {
      setActiveView("post-game");
    }

    if (party.host === username) {
      setIsHost(true);
    }
  }, [party, username]);

  const props = {
    party,
    username,
    game,
    isHost,
    pointedAt,
    onPoint,
  };

  const views = {
    "pre-game": <WaitingRoom {...props} />,
    "prompt-writing": <PromptWriting {...props} />,
    "game-play": <GamePlay {...props} />,
  };

  return <>{views[activeView]}</>;
}

export default SocketHOC(Party);
