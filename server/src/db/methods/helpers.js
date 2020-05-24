import mongoose from "mongoose";
import _shuffle from "lodash/shuffle";

import PartyModel from "../model";

import { nouns, adjectives } from "./slugWords";

import {
  lobbyPhase,
  promptPhase,
  midGamePhase,
  endGamePhase,
  postGamePhase,
} from "../../tests/testData";

// helpers
const computeTotalTurns = (party) => {
  let maxTeamSize = Math.ceil(party.players.length / party.settings.teamsCount);
  return maxTeamSize * party.settings.rotations * party.settings.teamsCount;
};

const isGameInProgress = (party) =>
  party.games.length && !party.games[party.games.length - 1].endTime;

const generateRandomTeamName = () => "team_" + Date.now();

const createInProgressGame = (gamePhase) => {
  const phaseMapper = {
    lobby: lobbyPhase,
    prompt: promptPhase,
    midGame: midGamePhase,
    endGame: endGamePhase,
    postGame: postGamePhase,
  };

  const instance = new PartyModel(phaseMapper[gamePhase]);

  return instance.save();
};

const getRandomPromptIndex = (currentTeamPlayers, prompts) => {
  const filteredPrompts = prompts.filter(
    (prompt) => !currentTeamPlayers.includes(prompt.author)
  );

  return Math.floor(Math.random() * filteredPrompts.length);
};

const generateSlug = () => {
  const number = String(Math.floor(Math.random() * 1000));
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${number}-${adjective}-${noun}`;
};

export default {
  computeTotalTurns,
  isGameInProgress,
  generateRandomTeamName,
  createInProgressGame,
  getRandomPromptIndex,
  generateSlug,
};
