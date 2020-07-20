import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import api from "../../utils/api";
import { TextInput, Button } from "../../components";

function JoinGame({
  slug,
  username,
  setUsername,
  showCreateGameView,
  setErrorMessage,
}) {
  const [roomCode, setRoomCode] = useState(slug);
  const [, setLocalStorage] = useLocalStorage("charades");
  const [isJoiningParty, setIsJoiningParty] = useState(false);

  useEffect(() => {
    setRoomCode(slug);
  }, [slug]);

  const joinParty = async () => {
    // prevent double clicking button
    if (isJoiningParty) return;
    setIsJoiningParty(true);

    const upperCaseRoomCode = roomCode.toUpperCase();
    const upperCaseUsername = username.toUpperCase();

    const { error, username: uuidUsername } = await api.joinParty({
      slug: upperCaseRoomCode,
      username: upperCaseUsername,
    });

    if (error) {
      console.error(`SERVER ERROR: ${error}`);
      setErrorMessage(error);
      setIsJoiningParty(false);
      return;
    }

    setLocalStorage({
      slug: upperCaseRoomCode,
      username: uuidUsername,
    });

    window.location.pathname = upperCaseRoomCode;
    setIsJoiningParty(false);
  };

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
