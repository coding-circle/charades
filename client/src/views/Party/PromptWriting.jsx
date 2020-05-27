import React, { useState, useMemo, useCallback } from "react";

import { Button, TextInput } from "../../components";
import api from "../../utils/api";

function PromptWriting({ party, username }) {
  const [prompt, setPrompt] = useState("");

  const getUserPromptsCount = useCallback(
    (username) => {
      return party.prompts.filter((prompt) => {
        return prompt.author === username;
      }).length;
    },
    [party]
  );

  const currentUserPromptsCount = useMemo(() => getUserPromptsCount(username), [
    getUserPromptsCount,
    username,
  ]);

  const requiredPromptsCount = useMemo(() => {
    return Math.ceil(
      (party.players.length / party.settings.teamsCount) *
        party.settings.rotations
    );
  }, [party]);

  const remainingPlayers = useMemo(() => {
    return party.players.filter((player) => {
      return getUserPromptsCount(player) < requiredPromptsCount;
    });
  }, [party, getUserPromptsCount, requiredPromptsCount]);

  const remainingPlayersText = useMemo(() => {
    const remainingPlayersCount = remainingPlayers.length;

    if (remainingPlayersCount > 3) {
      return `Waiting for ${remainingPlayersCount} players to write their prompts.`;
    }

    if (remainingPlayersCount > 0) {
      const remainingPlayersJoined = remainingPlayers.reduce(
        (text, value, i, array) =>
          text + (i < array.length - 1 ? ", " : " and ") + value
      );

      return `Still waiting for ${remainingPlayersJoined}!`;
    }

    return "Everyone finished their clues! 🥳🥳🥳";
  }, [remainingPlayers]);

  const handleAddPrompt = async () => {
    if (!prompt.length) return;

    await api.addPrompt({
      slug: party.slug,
      author: username,
      prompt,
    });

    setPrompt("");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddPrompt();
  };

  const handleStartGame = async (evt) => {
    evt.preventDefault();

    const res = await api.startGame({
      slug: party.slug,
    });

    return res;
  };

  return (
    <>
      <header className="app__header">
        <h1 className="text__heading app__title">WebCharades</h1>
      </header>
      <main className="app__main app__main--home">
        <h3>Start Writing!</h3>
        <p style={{ marginTop: "40px", width: "200px", textAlign: "center" }}>
          {remainingPlayersText}
        </p>
        <p className="text-input__sub-label" style={{ marginTop: "40px" }}>
          {`Prompt ${currentUserPromptsCount + 1} of ${requiredPromptsCount}`}
        </p>
        <form onSubmit={handleSubmit}>
          <TextInput
            name="prompt"
            style={{ marginTop: "20px" }}
            value={prompt}
            onChange={(evt) => {
              setPrompt(evt.target.value);
            }}
          />
          <Button type="primary" style={{ marginTop: "24px" }}>
            Submit Prompt
          </Button>
        </form>
      </main>
      <footer className="app__footer">
        {!remainingPlayers.length && (
          <Button
            type="secondary"
            className="button-secondary--min-width"
            onClick={handleStartGame}
          >
            Start Game!
          </Button>
        )}
      </footer>
    </>
  );
}

export default PromptWriting;
