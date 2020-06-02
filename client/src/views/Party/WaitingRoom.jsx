import React from "react";

import { Button, PlayerList, TeamBox } from "../../components";
import api from "../../utils/api";
import "./WaitingRoom.css";

function WaitingRoom({ party, isHost }) {
  const startGame = async () => {
    await api.createGame({ slug: party.slug });
  };

  const handleRoomCodeClick = () =>
    navigator.clipboard.writeText(window.location.href);

  return (
    <>
      <header className="app__header app__header--with-rule ">
        <div className="waiting-room__header">
          <span className="waiting-room__header-left">
            <h1 className="text__heading">WebCharades</h1>
          </span>
          <span className="waiting-room__header-divider"></span>
          <span className="waiting-room__header-right">
            <p className="waiting-room__header-subtext">Room:</p>
            <h1
              onClick={handleRoomCodeClick}
              className="text__heading text__all-caps"
              style={{ cursor: "pointer" }}
            >
              {party.slug}
            </h1>
          </span>
        </div>
      </header>
      <main className="app__main app__main--home">
        <TeamBox
          color="var(--color__foreground)"
          players={party.players}
          teamName="Players"
        >
          <PlayerList
            color="var(--color__foreground)"
            players={party.players}
            host={party.host}
          />
        </TeamBox>
        <p className="waiting-room__waiting-text">
          Waiting for all players to join...
        </p>
      </main>
      <footer className="app__footer">
        {isHost && (
          <Button
            type="primary"
            className="button-secondary--min-width"
            onClick={startGame}
          >
            Everyone's Here!
          </Button>
        )}
      </footer>
    </>
  );
}

export default WaitingRoom;
