import React from "react";

import { Button } from "../../components";
import api from "../../utils/api";

function WaitingRoom({ party, isHost }) {
  const startGame = async () => {
    await api.createGame({ slug: party.slug });
  };

  return (
    <>
      <header className="app__header app__header--with-rule">
        <h1 className="text__heading app__title">{party.slug}</h1>
      </header>
      <main className="app__main app__main--home">
        <ul>
          {party.players.map((player) => (
            <li key={player}>
              <p className="text__all-caps text__bold">{player}</p>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: "20px" }}>Waiting for all players to join...</p>
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
