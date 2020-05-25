import React, { useState, useEffect } from "react";

import { Button } from "../../components";

function GamePlay({ party, username, isHost, game, onPoint, pointedAt }) {
  const [turn, setTurn] = useState({});
  const [actorUp, setActorUp] = useState("");
  const [onDeck, setOnDeck] = useState("");

  useEffect(() => {
    const currentTurn = game.turns[game.turns.length - 1];
    setTurn(currentTurn);

    const actorUp = currentTurn.player;

    let onDeck = "";

    if (game.totalTurns > game.turns.length) {
      const nextTeamIndex =
        (currentTurn.teamIndex + 1) % party.settings.teamsCount;
      const nextTeam = game.teams[nextTeamIndex];

      onDeck = nextTeam.teamPlayers[nextTeam.playerIndex];
    }

    setActorUp(actorUp);
    setOnDeck(onDeck);
  }, [party, game.teams, game.totalTurns, game.turns]);

  return (
    <div className="app__main app__main--home">
      <p>
        {pointedAt.pointee &&
          `${pointedAt.pointer} pointed at ${pointedAt.pointee}`}
      </p>
      <br />
      <Button onClick={() => onPoint(party.players[1])}>Point At</Button>
    </div>
  );
}

export default GamePlay;
