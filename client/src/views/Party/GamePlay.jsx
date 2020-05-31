import React, { useMemo } from "react";

import { Button, TimerWidget, TeamBox, PlayerList } from "../../components";
import "./GamePlay.css";

function GamePlay({ party, username, isHost, game, onPoint, pointedAt }) {
  const turn = useMemo(() => game.turns[game.turns.length - 1], [game]);
  const actorUp = turn.player;
  const onDeck = useMemo(() => {
    if (game.totalTurns > game.turns.length) {
      const nextTeam =
        game.teams[(turn.teamIndex + 1) % party.settings.teamsCount];

      return nextTeam.teamPlayers[nextTeam.playerIndex];
    }
    return "";
  }, [game]);

  const teams = useMemo(() => {
    return game.teams.reduce((acc, cur) => {
      return cur.teamPlayers.includes(username) ? [cur, ...acc] : [...acc, cur];
    }, []);
  }, [game]);

  return (
    <>
      <header className="app__header app__header--with-rule">
        <h1 className="text__heading app__title">Teams</h1>
      </header>
      <main className="app__main">
        {teams.map((team, index) => (
          <TeamBox
            key={team.teamName}
            myTeam={index === 0}
            color={index ? "#F2994A" : "#BB6BD9"}
            teamName={team.teamName}
          >
            <PlayerList
              color={index ? "#F2994A" : "#BB6BD9"}
              players={team.teamPlayers}
              actorUp={actorUp}
              onDeck={onDeck}
            />
          </TeamBox>
        ))}
      </main>
    </>
  );
}

export default GamePlay;
