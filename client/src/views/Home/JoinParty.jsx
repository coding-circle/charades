import React, { useState, useEffect } from "react";
import { writeStorage } from "@rehooks/local-storage";

import api from "../../utils/api";
import { TextInput, Button, LoadingIndicator } from "../../components";

function JoinGame({
  slug,
  username,
  setUsername,
  showCreateGameView,
  setErrorMessage,
}) {
  const [roomCode, setRoomCode] = useState(slug);
  const [isJoiningParty, setIsJoiningParty] = useState(false);

  useEffect(() => {
    setRoomCode(slug);
  }, [slug]);

  const joinParty = async () => {
    const startTime = Date.now();

    // prevent double clicking button
    if (isJoiningParty) return;
    setIsJoiningParty(true);

    const upperCaseRoomCode = roomCode.toUpperCase();
    const upperCaseUsername = username.toUpperCase();

    const { error, uuidUsername } = await api.joinParty({
      username: upperCaseUsername,
      slug: upperCaseRoomCode,
    });

    if (error) {
      console.error(`SERVER ERROR: ${error}`);
      setErrorMessage(error);
      setIsJoiningParty(false);
      return;
    }

    writeStorage("charades", {
      username: uuidUsername,
      slug: upperCaseRoomCode,
    });

    // make sure loading screen shows for at least 1 second since clicking button
    // and 1/10th a second since setting local storage
    setTimeout(() => {
      window.location.pathname = upperCaseRoomCode;
    }, Math.min(100, Math.max(0, Date.now() - startTime + 1000)));
  };

  if (isJoiningParty) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <header className="app__header">
        <h1 className="text__heading app__title">CharadesSpace</h1>
      </header>
      <main className="app__main app__main--home">
        <TextInput
          name="room-code"
          label="Room Code"
          value={roomCode}
          onChange={(evt) => {
            setRoomCode(evt.target.value);
          }}
        />
        <TextInput
          name="player-name"
          label="Player Name"
          style={{ marginTop: "20px" }}
          value={username}
          onChange={(evt) => {
            setUsername(evt.target.value);
          }}
        />
        <Button
          onClick={joinParty}
          type="primary"
          style={{ marginTop: "24px" }}
          disabled={!roomCode || !username}
        >
          Join Game
        </Button>
      </main>
      <footer className="app__footer">
        <Button
          onClick={showCreateGameView}
          type="secondary"
          className="button-secondary--min-width"
          icon="+"
        >
          Create Game
        </Button>
      </footer>
    </>
  );
}

export default JoinGame;
