/**
 * useGameState.jsx
 * React hook for parsing party object and returning info about game state
 */
import { useMemo } from "react";

export const useGameState = ({ party, username }) => {
  // game
  const game = party.games[party.games.length - 1];

  // turn
  const turn = game.turns[game.turns.length - 1];

  // isHost
  const isHost = party.host === username;

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
  }, [
    party.settings.teamsCount,
    turn.teamIndex,
    game.totalTurns,
    game.turns.length,
    game.teams,
  ]);

  // inTurn
  // if game is currently in a turn (vs in between turn)
  const inTurn = useMemo(
    () =>
      game.turns[game.turns.length - 1].startTime &&
      !game.turns[game.turns.length - 1].endTime,
    [game.turns]
  );

  // userTeamIndex
  // original team index of current user. Used for renaming teams.
  const userTeamIndex = useMemo(
    () => game.teams.findIndex((team) => team.teamPlayers.includes(username)),
    [game.teams, username]
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
  }, [game.teams, userTeamIndex]);

  // actorUpTeam
  // if in turn only shows team with actor up
  const actorUpTeam = useMemo(
    () => game.teams.filter((team) => team.teamPlayers.includes(actorUp)),
    [game.teams, actorUp]
  );

  // isGameOver
  const isGameOver = game.endTime !== null;

  // isWinner
  let isWinner = useMemo(() => {
    if (!isGameOver) return false;

    const winningTeam = game.teams.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );

    return winningTeam.teamPlayers.includes(username);
  }, [isGameOver, game.teams, username]);

  return {
    // teams
    teams: inTurn ? actorUpTeam : reorderedTeams,
    scoreboardTeams: reorderedTeams,
    activeTeam: actorUpTeam[0],

    // game
    game,
    turn,
    isGameOver,
    isWinner,

    // active players
    inTurn,
    actorUp: isGameOver ? "" : actorUp,
    onDeck,
    isHost,

    // current user
    userTeamIndex,
    userTeamName,
  };
};
