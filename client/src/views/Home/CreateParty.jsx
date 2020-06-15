/*eslint no-unused-vars: "ignore" */

import React, { useState } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import api from "../../utils/api";
import { TextInput, CloseButton, Button } from "../../components";

function CreateGame({ username, setUsername, hideCreateGameView }) {
  const [teamsCount, setTeamsCount] = useState(2);
  const [rotations, setRotations] = useState(1);
  const [turnDurationSeconds, setTurnDurationSeconds] = useState(90);

  const [_, setLocalStorage] = useLocalStorage("charades");

  const createParty = async () => {
    const upperCaseUsername = username.toUpperCase();

    const res = await api.createParty({
      host: upperCaseUsername,
      settings: {
        teamsCount,
        rotations,
        turnDurationSeconds,
      },
    });

    if (!res || !res.data) {
      alert("Server Error");
      return;
    }

    const slug = res.data;

    setLocalStorage({
      username: upperCaseUsername,
      slug,
    });

    window.location.pathname = slug;
  };

  return (
    <>
      <header className="app__header app__header--with-rule">
        <h1 className="text__heading app__title">WebCharades</h1>
        <CloseButton onClick={hideCreateGameView} />
      </header>
      <main className="app__main app__main--home">
        <TextInput
          name="teams-count"
          label="Teams"
          subLabel="The number of teams playing"
          value={teamsCount}
          onChange={(evt) => {
            setTeamsCount(evt.target.value);
          }}
        />
        <TextInput
          name="rotations"
          label="Rotations"
          subLabel="The number of rounds per player"
          style={{ marginTop: "20px" }}
          value={rotations}
          onChange={(evt) => {
            setRotations(evt.target.value);
          }}
        />
        <TextInput
          name="turn-duration"
          label="Turn Duration"
          subLabel="The length of each turn (in seconds)"
          style={{ marginTop: "20px" }}
          value={turnDurationSeconds}
          onChange={(evt) => {
            setTurnDurationSeconds(evt.target.value);
          }}
        />
        <TextInput
          name="player-name"
          label="Player Name"
          subLabel=" "
          style={{ marginTop: "20px" }}
          value={username}
          onChange={(evt) => {
            setUsername(evt.target.value);
          }}
        />
        <Button
          onClick={createParty}
          type="primary"
          disabled={false}
          style={{ marginTop: "24px" }}
        >
          Create Game
        </Button>
      </main>
      <footer className="app__footer">
        <Button
          onClick={hideCreateGameView}
          type="secondary"
          className="button-secondary--min-width"
        >
          Cancel
        </Button>
      </footer>
    </>
  );
}

export default CreateGame;
