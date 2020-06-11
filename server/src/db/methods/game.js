import mongoose from "mongoose";
import _shuffle from "lodash/shuffle";

import partyMethods from "./party";
import helpers from "./helpers";

// create game
const createGame = async ({ slug }) => {
  const party = await partyMethods.getParty({ slug });

  const teams = helpers
    .generateTeamColor(party.settings.teamsCount)
    .map((teamColor) => {
      return {
        teamName: helpers.generateRandomTeamName(),
        teamPlayers: [],
        teamColor,
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
  const party = await partyMethods.getParty({ slug });

  party.prompts.push({ author, prompt });

  return party.save();
};

// start game
const startGame = async ({ slug }) => {
  const party = await partyMethods.getParty({ slug });
  const currentGame = party.games[party.games.length - 1];

  const randomPromptIndex = helpers.getRandomPromptIndex(
    currentGame.teams[0].teamPlayers,
    party.prompts
  );

  // remove a random prompt from list
  const [randomPrompt] = party.prompts.splice(randomPromptIndex, 1);

  const firstTurn = {
    teamIndex: 0,
    player: currentGame.teams[0].teamPlayers[0],
    author: randomPrompt.author,
    prompt: randomPrompt.prompt,
  };

  currentGame.startTime = Date.now();
  currentGame.turns.push(firstTurn);

  return party.save();
};

// start turn
const startTurn = async ({ slug }) => {
  const party = await partyMethods.getParty({ slug });
  const currentGame = party.games[party.games.length - 1];

  currentGame.turns[currentGame.turns.length - 1].startTime = Date.now() + 5000;

  return party.save();
};

// end turn
export const endTurn = async ({ slug, success }) => {
  const party = await partyMethods.getParty({ slug });

  const currentGame = party.games[party.games.length - 1];

  const currentTurn = currentGame.turns[currentGame.turns.length - 1];

  if (!currentTurn.startTime) {
    console.log("no start time");
    return party;
  }

  const {
    playerIndex: currentPlayerIndex,
    teamPlayers: currentTeamPlayers,
  } = currentGame.teams[currentTurn.teamIndex];

  // add status and endtime to current game
  currentTurn.endTime = Date.now();
  currentTurn.success = success;
  currentGame.teams[currentTurn.teamIndex].score += success ? 1 : 0;

  // if last turn, end game
  if (currentGame.totalTurns === currentGame.turns.length) {
    currentGame.endTime = Date.now();

    return party.save();
  }

  // change playerIndex on previous team
  currentGame.teams[currentTurn.teamIndex].playerIndex =
    (currentPlayerIndex + 1) % currentTeamPlayers.length;

  const nextTeamIndex = (currentTurn.teamIndex + 1) % party.settings.teamsCount;

  const {
    playerIndex: nextPlayerIndex,
    teamPlayers: nextTeamPlayers,
  } = currentGame.teams[nextTeamIndex];

  const randomPromptIndex = helpers.getRandomPromptIndex(
    nextTeamPlayers,
    party.prompts
  );

  // remove prompt from prompts list
  const [randomPrompt] = party.prompts.splice(randomPromptIndex, 1);

  const nextTurn = {
    teamIndex: nextTeamIndex,
    player: nextTeamPlayers[nextPlayerIndex],
    author: randomPrompt.author,
    prompt: randomPrompt.prompt,
  };

  // add next turn
  currentGame.turns.push(nextTurn);
  return party.save();
};

// skip player
const skipPlayer = async ({ slug }) => {
  const party = await partyMethods.getParty({ slug });

  const currentGame = party.games[party.games.length - 1];
  const currentTurn = currentGame.turns[currentGame.turns.length - 1];
  const { teamIndex } = currentGame.turns[currentGame.turns.length - 1];

  const {
    playerIndex: currentPlayerIndex,
    teamPlayers: currentTeamPlayers,
  } = currentGame.teams[teamIndex];

  const newPlayerIndex = (currentPlayerIndex + 1) % currentTeamPlayers.length;
  const newPlayer = currentGame.teams[teamIndex].teamPlayers[newPlayerIndex];

  currentGame.teams[teamIndex].playerIndex = newPlayerIndex;
  currentTurn.player = newPlayer;

  return party.save();
};

// rename team
const renameTeam = async ({ slug, teamIndex, teamName }) => {
  const party = await partyMethods.getParty({ slug });

  if (!helpers.isGameInProgress(party)) {
    return party;
  }

  const currentGame = party.games[party.games.length - 1];
  currentGame.teams[teamIndex].teamName = teamName.toUpperCase();

  return party.save();
};

export default {
  createGame,
  addPrompt,
  startGame,
  startTurn,
  endTurn,
  renameTeam,
  skipPlayer,
};
