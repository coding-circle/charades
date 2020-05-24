import React, { useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import api from "../../utils/api";
import { TextInput, Button } from "../../components";

function JoinGame({ slug, playerName, setPlayerName, showCreateGameView }) {
  const [roomCode, setRoomCode] = useState(slug);
  const [localStorage, setLocalStorage] = useLocalStorage("charades");

  useEffect(() => {
    setRoomCode(slug);
  }, [slug]);

  const joinParty = async () => {
    const { error } = await api.joinParty({
      slug: roomCode,
      username: playerName,
    });

    if (error) {
      console.error(`SERVER ERROR: ${error}`);
    }

    setLocalStorage({
      slug: roomCode,
      username: playerName,
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
          value={playerName}
          onChange={(evt) => {
            setPlayerName(evt.target.value);
          }}
        />
        <Button
          onClick={joinParty}
          type="primary"
          disabled={false}
          style={{ marginTop: "24px" }}
          disabled={!roomCode.length || !playerName.length}
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
