import React, { useState } from "react";

import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";

function Home({ username: storageUsername, slug, setCurrentViewToParty }) {
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [username, setUsername] = useState(storageUsername);

  const showCreateGameView = () => setCreateGameOpen(true);
  const hideCreateGameView = () => setCreateGameOpen(false);

  return (
    <div id="app">
      {createGameOpen ? (
        <CreateGame
          username={username}
          setUsername={setUsername}
          hideCreateGameView={hideCreateGameView}
          setCurrentViewToParty={setCurrentViewToParty}
        />
      ) : (
        <JoinGame
          slug={slug}
          username={username}
          setUsername={setUsername}
          showCreateGameView={showCreateGameView}
          setCurrentViewToParty={setCurrentViewToParty}
        />
      )}
    </div>
  );
}

export default Home;
