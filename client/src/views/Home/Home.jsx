import React, { useState, useCallback, useEffect } from "react";

import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";

function Home({ username, slug, setCurrentViewToGame }) {
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [playerName, setPlayerName] = useState(username);

  const showCreateGameView = () => setCreateGameOpen(true);
  const hideCreateGameView = () => setCreateGameOpen(false);

  return (
    <div id="app">
      {createGameOpen ? (
        <CreateGame
          playerName={playerName}
          setPlayerName={setPlayerName}
          hideCreateGameView={hideCreateGameView}
          setCurrentViewToGame={setCurrentViewToGame}
        />
      ) : (
        <JoinGame
          slug={slug}
          playerName={playerName}
          setPlayerName={setPlayerName}
          showCreateGameView={showCreateGameView}
          setCurrentViewToGame={setCurrentViewToGame}
        />
      )}
    </div>
  );
}

export default Home;
