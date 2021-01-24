import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  TextInput,
  Button,
  LoadingIndicator,
  HowToPlayModal,
} from "../../components";

function JoinGame({
  slug,
  username,
  setUsername,
  showCreateGameView,
  setErrorMessage,
  onJoinParty,
}) {
  const [roomCode, setRoomCode] = useState(slug);
  const [isJoiningParty, setIsJoiningParty] = useState(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);

  const handleHowToPlayModalOpen = () => setHowToPlayOpen(true);
  const handleHowToPlayModalClose = () => setHowToPlayOpen(false);

  useEffect(() => {
    setRoomCode(slug);
  }, [slug]);

  const joinParty = async () => {
    // prevent double clicking button
    if (isJoiningParty) return;
    setIsJoiningParty(true);

    const upperCaseRoomCode = roomCode.toUpperCase();
    const upperCaseUsername = username.toUpperCase();

    const { error, party, uuidUsername } = await api.joinParty({
      username: upperCaseUsername,
      slug: upperCaseRoomCode,
    });

    if (error) {
      console.error(`SERVER ERROR: ${error}`);
      setErrorMessage(error);
      setIsJoiningParty(false);
      return;
    }

    onJoinParty(party, uuidUsername);
  };

  if (isJoiningParty) {
    return <LoadingIndicator />;
  }

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
        >
          Join Game
        </Button>
        <Button
          onClick={showCreateGameView}
          className="button-disabled"
          type="primary"
          style={{ marginTop: "24px" }}
          icon="+"
        >
          Create Game
        </Button>
      </main>
      <footer className="app__footer">
        <Button onClick={handleHowToPlayModalOpen} className="button-secondary">
          How To Play
        </Button>
      </footer>
      <HowToPlayModal
        isActive={howToPlayOpen}
        onClickClose={handleHowToPlayModalClose}
      />
    </>
  );
}

export default JoinGame;
