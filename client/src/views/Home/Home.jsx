import React, { useState } from "react";

import CreateGame from "./CreateParty";
import JoinParty from "./JoinParty";
import HowToPlay from "./HowToPlay";
import { Modal } from "../../components";

function Home({ username: storageUsername, slug, onJoinParty }) {
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [username, setUsername] = useState(storageUsername.slice(0, -7));
  const [errorMessage, setErrorMessage] = useState("");

  const showCreateGameView = () => setCreateGameOpen(true);
  const hideCreateGameView = () => setCreateGameOpen(false);

  // Show and hide content about how to play with charades app
  const showHowToPlay = () => setHowToPlayOpen(true);
  const hideHowToPlay = () => setHowToPlayOpen(false);

  const handleErrorModalClose = () => setErrorMessage("");

  return (
    <div id="app">
      {createGameOpen && (
        <CreateGame
          username={username}
          setUsername={setUsername}
          hideCreateGameView={hideCreateGameView}
          onJoinParty={onJoinParty}
          setErrorMessage={setErrorMessage}
        />
      )}
      {howToPlayOpen && <HowToPlay hideHowToPlay={hideHowToPlay} />}
      {!createGameOpen && !howToPlayOpen && (
        <JoinParty
          slug={slug}
          username={username}
          setUsername={setUsername}
          showCreateGameView={showCreateGameView}
          showHowToPlay={showHowToPlay}
          onJoinParty={onJoinParty}
          setErrorMessage={setErrorMessage}
        />
      )}
      <Modal
        noCancel
        isActive={!!errorMessage}
        title="Server Error!"
        submitButtonText="Okay"
        onClickSubmit={handleErrorModalClose}
        type="alert"
        body={errorMessage}
      />
    </div>
  );
}

export default Home;
