import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";
import { TextInput, Button } from "./components";

// TODO: load from env
const BASE_URL = "http://localhost:4001";

function App() {
  const [partySlug, setPartySlug] = useState(null);
  const [slugToJoin, setSlugToJoin] = useState(null);

  const [host, setHost] = useState(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const connect = async () => {
      const res = await axios.get(BASE_URL);
      console.log(res);
    };
    connect();
  }, []);

  useEffect(() => {
    if (partySlug) {
      const socket = io(`${BASE_URL}/${partySlug}`);
      socket.on("connect", () => {
        console.log("** socket connected");
      });
      socket.on("update", console.log);
    }
  }, [partySlug]);

  const createParty = useCallback(async () => {
    const res = await axios.post("http://localhost:4001/api/party");

    const { data = {} } = res;
    const { slug } = data;
    setHost(true);
    setPartySlug(slug);
  });

  const joinParty = useCallback(async () => {
    const res = await axios.put(
      `http://localhost:4001/api/party/${slugToJoin}`,
      {
        username: "Andy",
      }
    );

    console.log(res);
    const { data = {} } = res;
    const { slug } = data;
    setHost(false);
    setPartySlug(slug);
  });

  const addPrompt = async () => {
    const res = await axios.post(
      `http://localhost:4001/api/party/${partySlug}/prompt`,
      {
        author: "Andy",
        prompt,
      }
    );

    console.log("response after adding prompt: ", res);
  };

  return (
    <div id="app">
      <header className="app__header">
        <h1 className="text__h1 app__title">Charades</h1>
      </header>
      {partySlug ? (
        <main className="app__main app__main--home">
          `${host ? "Created" : "Joined"} party ${partySlug}`
          <button onClick={addPrompt}>Add Prompt</button>
          <input
            type="text"
            onChange={(evt) => {
              setPrompt(evt.target.value);
            }}
          />
        </main>
      ) : (
        <main className="app__main app__main--home">
          <TextInput
            name="room-code"
            label="Room Code"
            onChange={(evt) => {
              setSlugToJoin(evt.target.value);
            }}
          ></TextInput>
          <TextInput
            name="player-name"
            label="Player Name"
          ></TextInput>
          <Button
            onClick={joinParty}
            type="primary"
            disabled={false}
            style={{marginTop: "32px"}}
          >Join Game</Button>
        </main>
      )}
      <footer className="app__footer">
        {partySlug || (
          <Button
            onClick={createParty}
            type="secondary"
            className="button-secondary--min-width"
            icon="+"
          >Create Game</Button>
        )}
      </footer>
    </div>
  );
}

export default App;
