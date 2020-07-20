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

  // actorUpTeamColor
  const actorUpTeamColor = useMemo(() => {
    const teamIndex = game.teams.findIndex(({ teamPlayers }) =>
      teamPlayers.includes(actorUp)
    );

    return game.teams[teamIndex].teamColor;
  }, [actorUp, game.teams]);

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

  // userTeamIndex
  // original team index of current user. Used for renaming teams.
  const userTeamIndex = useMemo(
    () => game.teams.findIndex((team) => team.teamPlayers.includes(username)),
    [game, username]
  );

  // inTurn
  // if game is currently in a turn (vs in between turn)
  const inTurn = useMemo(
    () =>
      !!game.turns[game.turns.length - 1].startTime &&
      !game.turns[game.turns.length - 1].endTime,
    [game.turns]
  );

  // userInTurn
  const userInTurn = useMemo(
    () =>
      inTurn &&
      game.teams[
        game.turns[game.turns.length - 1].teamIndex
      ].teamPlayers.includes(username),
    [inTurn, username, game]
  );

  // userTeamName
  const userTeamName = game.teams[userTeamIndex]
    ? game.teams[userTeamIndex].teamName
    : null;

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

  // result
  let result = useMemo(() => {
    if (!isGameOver) return null;

    const winningScore = game.teams.reduce((highestScore, current) => {
      return highestScore > current.score ? highestScore : current.score;
    }, 0);

    const winningTeams = game.teams.filter(
      (team) => team.score === winningScore
    );

    if (
      winningTeams.length === 1 &&
      winningTeams[0].teamPlayers.includes(username)
    ) {
      return "win";
    }

    if (
      winningTeams.length > 1 &&
      winningTeams.some(({ teamPlayers }) => teamPlayers.includes(username))
    ) {
      return "tie";
    }

    return "lose";
  }, [isGameOver, game.teams, username]);

  // Previous Turn
  const previousTurn = useMemo(() => {
    if (game.turns.length <= 1) return null;

    const turn = isGameOver
      ? game.turns[game.turns.length - 1]
      : game.turns[game.turns.length - 2];

    const [authorTeam] = game.teams.filter((team) =>
      team.teamPlayers.includes(turn.author)
    );

    return {
      ...turn,
      color: authorTeam ? authorTeam.teamColor : "#FFFFFF",
    };
  }, [game, isGameOver]);

  return {
    // teams
    teams: userInTurn ? actorUpTeam : reorderedTeams,
    scoreboardTeams: reorderedTeams,
    activeTeam: actorUpTeam[0],

    // game
    game,
    turn,
    isGameOver,
    result,
    previousTurn,

    // active players
    inTurn,
    userInTurn,
    actorUp: isGameOver ? "" : actorUp,
    onDeck,
    isHost,
    actorUpTeamColor,

    // current user
    userTeamIndex,
    userTeamName,
  };
};
