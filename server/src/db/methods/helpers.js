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

const generateRandomTeamName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  const teamName = `${adjective}${noun}`;
  if (teamName.length > 10) return teamName.substring(0, 10);
  return teamName.toUpperCase();
};

function generateTeamColor (teamsCount, startingHue = Math.floor(Math.random() * 360)) {
    return new Array(teamsCount)
      .fill('')
      .map((_, index) => {
        var hue = (startingHue + (Math.floor(360 / teamsCount) * index)) % 360;
        return `hsl(${hue}, 100%, 75%)`
      });
  }


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
  const filteredPrompts = prompts
    .map((prompt, promptIndex) => {
      return {
        author: prompt.author,
        promptIndex,
      };
    })
    .filter((prompt) => !currentTeamPlayers.includes(prompt.author));

  return filteredPrompts[Math.floor(Math.random() * filteredPrompts.length)]
    .promptIndex;
};

const generateSlug = () => {
  const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "0123456789";

  const random = (chars) => {
    return chars[Math.floor(Math.random() * chars.length)];
  };

  let slug = "";
  for (let i = 0; i < 3; i++) slug = slug + random(letter);
  for (let i = 0; i < 3; i++) slug = slug + random(number);

  return slug;
};

export default {
  computeTotalTurns,
  isGameInProgress,
  generateRandomTeamName,
  generateTeamColor,
  createInProgressGame,
  getRandomPromptIndex,
  generateSlug,
};
