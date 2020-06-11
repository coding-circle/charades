import React, { useState } from "react";

import CreateGame from "./CreateParty";
import JoinParty from "./JoinParty";

function Home({ username: storageUsername, slug, setCurrentViewToParty }) {
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [username, setUsername] = useState(storageUsername);

  const showCreateGameView = () => setCreateGameOpen(true);
  const hideCreateGameView = () => setCreateGameOpen(false);

  const handleChangeUsername = (username) => setUsername(username.toUpperCase());

  return (
    <div id="app">
      {createGameOpen ? (
        <CreateGame
          username={username}
          onChangeUsername={handleChangeUsername}
          hideCreateGameView={hideCreateGameView}
          setCurrentViewToParty={setCurrentViewToParty}
        />
      ) : (
        <JoinParty
          slug={slug}
          username={username}
          onChangeUsername={handleChangeUsername}
          showCreateGameView={showCreateGameView}
          setCurrentViewToParty={setCurrentViewToParty}
        />
      )}
    </div>
  );
}

export default Home;
