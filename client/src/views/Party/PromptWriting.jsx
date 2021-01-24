import React, { useState, useMemo, useCallback } from "react";

import { Button, TextInput } from "../../components";
import api from "../../utils/api";

function PromptWriting({ party, username }) {
  const [prompt, setPrompt] = useState("");

  const isHost = party.host === username;

  const getUserPromptsCount = useCallback(
    (username) => {
      return party.prompts.filter((prompt) => {
        return prompt.author === username;
      }).length;
    },
    [party]
  );

  const userPromptsCount = useMemo(() => getUserPromptsCount(username), [
    getUserPromptsCount,
    username,
  ]);

  const requiredPromptsCount = useMemo(() => {
    const isOddNumberOfPlayers = Boolean(party.players.length % 2);

    return isOddNumberOfPlayers
      ? party.settings.rotations + 1
      : party.settings.rotations;
  }, [party]);

  const remainingPromptWriters = useMemo(() => {
    return party.players.filter((player) => {
      return getUserPromptsCount(player) < requiredPromptsCount;
    });
  }, [party, getUserPromptsCount, requiredPromptsCount]);

  const remainingPlayersText = useMemo(() => {
    const remainingPlayersCount = remainingPromptWriters.length;

    if (remainingPlayersCount > 3) {
      return `Waiting for ${remainingPlayersCount} players to write their prompts.`;
    }

    if (remainingPlayersCount > 0) {
      const remainingPlayersJoined = remainingPromptWriters
        .map((player) => player.slice(0, -7))
        .reduce(
          (text, username, i, array) =>
            `${text}${i < array.length - 1 ? "," : " and"} ${username}`
        );

      return `Still waiting for ${remainingPlayersJoined}!`;
    }

    return "Everyone finished their clues! 🥳🥳🥳";
  }, [remainingPromptWriters]);

  const handleAddPrompt = async () => {
    // clears prompt to prevent duplicates
    const tempPrompt = prompt;
    setPrompt("");

    if (!tempPrompt.length) return;

    await api.addPrompt({
      slug: party.slug,
      author: username,
      prompt: tempPrompt,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleAddPrompt();
  };

  const handleStartGame = async (evt) => {
    evt.preventDefault();

    await api.startGame({
      slug: party.slug,
    });
  };

  return (
    <>
      <header className="app__header">
        <h1 className="text__heading app__title">CharadesSpace</h1>
      </header>
      <main className="app__main app__main--home">
        <h3>
          {userPromptsCount + 1 <= requiredPromptsCount
            ? "Start Writing!"
            : "You're Done!"}
        </h3>
        <p style={{ marginTop: "40px", width: "200px", textAlign: "center" }}>
          {remainingPlayersText}
        </p>
        {userPromptsCount + 1 <= requiredPromptsCount && (
          <>
            <p className="text-input__sub-label" style={{ marginTop: "40px" }}>
              {`Prompt ${userPromptsCount + 1} of ${requiredPromptsCount}`}
            </p>
            <form onSubmit={handleSubmit}>
              <TextInput
                multiline
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
          </>
        )}
      </main>
      <footer className="app__footer">
        {!remainingPromptWriters.length && isHost && (
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
