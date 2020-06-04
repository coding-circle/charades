/**
 * useGameState.jsx
 * React hook for parsing party object and returning info about game state
 */
import { useEffect, useState, useMemo } from "react";

export const useGameState = ({ party, username }) => {
  // game
  const game = party.games[party.games.length - 1];

  //turn
  const turn = game.turns[game.turns.length - 1];

  // actorUp
  const actorUp = turn.player;

  // onDeck
  const onDeck = useMemo(() => {
    if (game.totalTurns > game.turns.length) {
      const nextTeam =
        game.teams[(turn.teamIndex + 1) % party.settings.teamsCount];

      return nextTeam.teamPlayers[nextTeam.playerIndex];
    }
    return "";
  }, [game]);

  // inTurn
  // if game is currently in a turn (vs in between turn)
  const inTurn = useMemo(
    () =>
      game.turns[game.turns.length - 1].startTime &&
      !game.turns[game.turns.length - 1].endTime,
    [game]
  );

  // userTeamIndex
  const userTeamIndex = useMemo(
    () => game.teams.findIndex((team) => team.teamPlayers.includes(username)),
    [game]
  );

  // userTeamName
  const userTeamName = game.teams[userTeamIndex].teamName;

  // reordered/filtered teams
  // teams reordered so that users team is first
  const reorderedTeams = useMemo(() => {
    // makes the users team the first team
    return game.teams.reduce((acc, cur, index) => {
      return index === userTeamIndex ? [cur, ...acc] : [...acc, cur];
    }, []);
  }, [game]);

  // actorUpTeam
  // if in turn only shows team with actor up
  const actorUpTeam = useMemo(() =>
    game.teams.filter((team) => team.teamPlayers.includes(actorUp))
  );

  return {
    teams: inTurn ? actorUpTeam : reorderedTeams,
    scoreboardTeams: reorderedTeams,
    game,
    turn,
    inTurn,
    actorUp,
    onDeck,
    userTeamIndex,
    userTeamName,
  };
};
