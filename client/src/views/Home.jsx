import React, { useState, useCallback, useEffect } from "react";

import api from "../utils/api";
import { TextInput, Button } from "../components";

function Home(props) {
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [roomCode, setRoomCode] = useState(props.slug);
  const [playerName, setPlayerName] = useState(props.username);

  useEffect(() => {
    setRoomCode(props.slug);
  }, [props.slug]);

  const createParty = async () => {
    const party = await api.createParty({
      host: playerName,
    });
  };

  const joinParty = async () => {
    if (!roomCode || !playerName) {
      return alert("Room Code and Player Name must be filled out!");
    }

    const { error } = await api.joinParty({
      slug: roomCode,
      username: playerName,
    });

    if (error) {
      console.error(`SERVER ERROR: ${error}`);
      // handle error?
    }

    setCreateGameOpen(false);
  };

  return (
    <div id="app">
      <header className="app__header">
        <h1 className="text__heading app__title">Charades</h1>
      </header>

      {createGameOpen ? (
        <main className="app__main app__main--home">Host Screen</main>
      ) : (
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
          >
            Join Game
          </Button>
        </main>
      )}

      <footer className="app__footer">
        {!createGameOpen && (
          <Button
            onClick={() => setCreateGameOpen(true)}
            type="secondary"
            className="button-secondary--min-width"
            icon="+"
          >
            Create Game
          </Button>
        )}
      </footer>
    </div>
  );
}

export default Home;
