/*eslint no-unused-vars: "ignore" */
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import api from "../../utils/api";
import { TextInput, Button } from "../../components";

function JoinGame({ slug, username, setUsername, showCreateGameView }) {
  const [roomCode, setRoomCode] = useState(slug);
  const [_, setLocalStorage] = useLocalStorage("charades");

  useEffect(() => {
    setRoomCode(slug);
  }, [slug]);

  const joinParty = async () => {
    const { error } = await api.joinParty({
      slug: roomCode,
      username: username,
    });

    if (error) {
      console.error(`SERVER ERROR: ${error}`);
    }

    setLocalStorage({
      slug: roomCode,
      username: username,
    });

    window.location.pathname = slug;
  };
  return (
    <>
      <header className="app__header">
        <h1 className="text__heading app__title">WebCharades</h1>
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
          disabled={!roomCode.length || !username.length}
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
