import React, { useState } from "react";
import CreateGame from "./CreateParty";
import JoinParty from "./JoinParty";
import { Modal } from "../../components";

function Home({ username: storageUsername, slug, onJoinParty }) {
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [username, setUsername] = useState(storageUsername.slice(0, -7));
  const [errorMessage, setErrorMessage] = useState("");

  const showCreateGameView = () => setCreateGameOpen(true);
  const hideCreateGameView = () => setCreateGameOpen(false);

  const handleErrorModalClose = () => setErrorMessage("");

  return (
    <div id="app">
      {createGameOpen ? (
        <CreateGame
          username={username}
          setUsername={setUsername}
          hideCreateGameView={hideCreateGameView}
          onJoinParty={onJoinParty}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <JoinParty
          slug={slug}
          username={username}
          setUsername={setUsername}
          showCreateGameView={showCreateGameView}
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
