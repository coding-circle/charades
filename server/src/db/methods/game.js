import mongoose from "mongoose";
import _shuffle from "lodash/shuffle";

import partyMethods from "./party";
import helpers from "./helpers";

// create game
const createGame = async ({ slug }) => {
  const party = await partyMethods.getParty(slug);

  const teams = [...new Array(party.settings.teamsCount)].map(() => {
    return {
      teamName: helpers.generateRandomTeamName(),
      teamPlayers: [],
    };
  });

  const shuffledPlayers = _shuffle(party.players);

  const teamsWithPlayers = shuffledPlayers.reduce((teams, player, index) => {
    teams[index % party.settings.teamsCount].teamPlayers.push(player);

    return teams;
  }, teams);

  party.games.push({
    teams: teamsWithPlayers,
    totalTurns: helpers.computeTotalTurns(party),
    turns: [],
  });

  return party.save();
};

// add prompt
const addPrompt = async ({ slug, prompt, author }) => {
  const party = await partyMethods.getParty(slug);

  party.prompts.push({ author, prompt });

  return party.save();
};

// start game
const startGame = async ({ slug }) => {
  const party = await partyMethods.getParty(slug);
  const currentGame = party.games[party.games.length - 1];

  const randomPromptIndex = getRandomPromptIndex(
    currentGame.team[0].teamPlayers,
    party.prompts
  );

  // remove a random prompt from list
  const [randomPrompt] = prompts.splice(1, randomPromptIndex);

  const firstTurn = {
    teamIndex: 0,
    player: currentGame.team[0].teamPlayers[0],
    ...randomPrompt,
  };

  currentGame.startTime = Date.now();
  currentGame.turns.push(firstTurn);

  return party.save();
};

// start turn
const startTurn = async ({ slug }) => {
  const party = await partyMethods.getParty(slug);
  const currentGame = party.games[party.games.length - 1];

  currentGame.turns[currentGame.turns.length - 1].startTime = Date.now() + 5000;

  return party.save();
};

// end turn
const endTurn = async ({ slug, success }) => {
  const party = await partyMethods.getParty(slug);
  const currentGame = party.games[party.games.length - 1];

  const teamIndex = currentGame.turns[currentGame.turns.length - 1];

  const {
    playerIndex: currentPlayerIndex,
    teamPlayers: currentTeamPlayers,
  } = currentGame.teams[teamIndex];

  // add status and endtime to current game
  currentGame.turns[currentGame.turns.length - 1].endTime = Date.now();
  currentGame.turns[currentGame.turns.length - 1].success = success;

  // if last turn, end game
  if (currentGames.totalTurns === currentParty.turns.length) {
    currentGame.endTime === Date.now();

    return party.save();
  }

  // change playerIndex on previous team
  currentGame.teams[teamIndex].playerIndex =
    (currentPlayerIndex + 1) % currentTeamPlayers.length;

  const nextTeamIndex = (teamIndex + 1) % party.settings.teamsCount;

  const {
    playerIndex: nextPlayerIndex,
    teamPlayers: nextTeamPlayers,
  } = currentGame.teams[teamIndex];

  const randomPromptIndex = getRandomPromptIndex(
    nextTeamPlayers,
    party.prompts
  );

  // remove prompt from prompts list
  const [randomPrompt] = party.prompts.splice(1, randomPromptIndex);

  const nextTurn = {
    teamIndex: nextTeamIndex,
    player: nextTeamPlayers[nextPlayerIndex],
    ...randomPrompt,
  };

  // add next turn
  currentGame.turns.push(nextTurn);
  return party.save();
};

// rename team
const renameTeam = async ({ slug, teamIndex, teamName }) => {
  const party = await partyMethods.getParty(slug);

  if (!helpers.isGameInProgress(party)) {
    return party;
  }

  const currentGame = party.games[party.games.length - 1];
  currentGame.teams[teamIndex].teamName = teamName;

  return party.save();
};

export default {
  createGame,
  addPrompt,
  startGame,
  startTurn,
  endTurn,
  renameTeam,
};
