import React, { useMemo } from "react";

import {
  Button,
  TimerWidget,
  TeamBox,
  PlayerList,
  Score,
  Turn,
} from "../../components";
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

  const inTurn = useMemo(
    () =>
      game.turns[game.turns.length - 1].startTime &&
      !game.turns[game.turns.length - 1].endTime
  );

  const teams = useMemo(() => {
    if (inTurn) {
      return game.teams.filter((team) => team.teamPlayers.includes(actorUp));
    }
    // makes the users team the first team
    return game.teams.reduce((acc, cur) => {
      return cur.teamPlayers.includes(username) ? [cur, ...acc] : [...acc, cur];
    }, []);
  }, [game]);

  return (
    <>
      {!inTurn && (
        <header className="app__header app__header--with-rule">
          <h1 className="text__heading app__title">Teams</h1>
        </header>
      )}
      <main className="app__main">
        {teams.map((team, index) => (
          <TeamBox
            key={team.teamName}
            myTeam={team.teamPlayers.includes(username)}
            color={team.teamColor}
            teamName={team.teamName}
            fullHeight={inTurn}
          >
            {inTurn ? (
              <Turn
                party={party}
                game={game}
                turn={game.turns[game.turns.length - 1]}
                username={username}
              />
            ) : (
              <>
                <PlayerList
                  party={party}
                  username={username}
                  color={team.teamColor}
                  players={team.teamPlayers}
                  actorUp={actorUp}
                  onDeck={onDeck}
                />
                {game.turns.length > 1 && <Score score={team.score} />}
              </>
            )}
          </TeamBox>
        ))}
      </main>
    </>
  );
}

export default GamePlay;
