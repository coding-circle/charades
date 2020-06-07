import React, { useState } from "react";

import api from "../../utils/api";
import { TextInput, Button } from "../../components";

function PlayGame({ party, onPlayAgainClose }) {
  const [teamsCount, setTeamsCount] = useState(party.settings.teamsCount);
  const [rotations, setRotations] = useState(party.settings.rotations);
  const [turnDurationSeconds, setTurnDurationSeconds] = useState(
    party.settings.turnDurationSeconds
  );

  const handlePlayAgainClick = async () => {
    try {
      await api.updateSettings({
        slug: party.slug,
        settings: {
          teamsCount,
          rotations,
          turnDurationSeconds,
        },
      });

      await api.createGame({ slug: party.slug });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
        <Button
          onClick={handlePlayAgainClick}
          type="primary"
          disabled={false}
          style={{ marginTop: "24px" }}
        >
          Play Again!
        </Button>
      </main>
      <footer className="app__footer">
        <Button
          onClick={onPlayAgainClose}
          type="secondary"
          className="button-secondary--min-width"
          icon="♛"
        >
          Scoreboard
        </Button>
      </footer>
    </>
  );
}

export default PlayGame;
