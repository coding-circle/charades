import React, { useState } from "react";

import api from "../../utils/api";
import { TextInput, Button, Checkbox } from "../../components";

function PlayGame({ party, onPlayAgainClose }) {
  const [keepSameTeams, setKeepSameTeams] = useState(false);
  const [teamsCount, setTeamsCount] = useState(party.settings.teamsCount);
  const [rotations, setRotations] = useState(party.settings.rotations);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnDurationSeconds, setTurnDurationSeconds] = useState(
    party.settings.turnDurationSeconds
  );

  const handlePlayAgainClick = async () => {
    setIsSubmitting(true);

    try {
      await api.updateSettings({
        slug: party.slug,
        settings: {
          ...(!keepSameTeams && { teamsCount }),
          rotations,
          turnDurationSeconds,
        },
      });

      await api.createGame({ slug: party.slug, keepSameTeams });

      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
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
          disabled={keepSameTeams}
          onChange={(evt) => {
            setTeamsCount(evt.target.value.replace(/\D/,''));
          }}
        />
        <TextInput
          name="rotations"
          label="Rotations"
          subLabel="The number of rounds per player"
          style={{ marginTop: "20px" }}
          value={rotations}
          onChange={(evt) => {
            setRotations(evt.target.value.replace(/\D/,''));
          }}
        />
        <TextInput
          name="turn-duration"
          label="Turn Duration"
          subLabel="The length of each turn (in seconds)"
          style={{ marginTop: "20px" }}
          value={turnDurationSeconds}
          onChange={(evt) => {
            setTurnDurationSeconds(evt.target.value.replace(/\D/,''));
          }}
        />
        <div style={{ marginTop: "32px", width: "100%", maxWidth: "24rem" }}>
          <Checkbox
            checked={keepSameTeams}
            onChange={(checked) => setKeepSameTeams(checked)}
            label="Keep Same Teams"
          />
        </div>
        <Button
          onClick={handlePlayAgainClick}
          type="primary"
          disabled={isSubmitting}
          style={{ marginTop: "12px" }}
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
