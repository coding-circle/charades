import mongoose from "mongoose";
import _shuffle from "lodash/shuffle";
import {
  lobbyPhase,
  promptPhase,
  midGamePhase,
  endGamePhase,
  postGamePhase,
} from "../tests/testData";

// This is just the beginning of the schema laid out in the README
const Party = new mongoose.Schema(
  {
    slug: String,
    host: {
      type: String,
      validate: {
        validator: function (host) {
          return this.players.includes(host);
        },
        message: "Players array must contain host",
      },
      required: true,
    },
    players: [String],
    settings: {
      rotations: { type: Number, default: 1 },
      turnDurationSeconds: { type: Number, default: 120 },
      teamsCount: { type: Number, default: 2 },
      autoStart: { type: Boolean, default: false },
    },
    games: [
      {
        startTime: { type: Date, default: null },
        endTime: { type: Date, default: null },
        teams: [
          {
            teamName: { type: String, required: true },
            teamPlayers: [String],
            playerIndex: { type: Number, default: 0 },
            score: { type: Number, default: 0 },
          },
        ],
        totalTurns: {
          type: Number,
          required: true,
        },
        turns: [
          {
            startTime: { type: Date, default: null },
            endTime: { type: Date, default: null },
            author: { type: String, required: true },
            prompt: { type: String, required: true },
            teamIndex: { type: Number, required: true },
            player: { type: String, required: true },
            success: { type: Boolean }, // success not present while the turn is in progress
          },
        ],
      },
    ],
    prompts: [
      {
        author: { type: String, required: true },
        prompt: {
          type: String,
          required: true,
          validate: {
            validator: function (prompt) {
              return prompt.length > 0;
            },
            message: "Prompt must have a length of at least 1",
          },
        },
      },
    ],
  },
  { timestamps: true }
);

export const PartyModel = mongoose.model("Party", Party);

// helpers
const computeTotalTurns = (party) => {
  let maxTeamSize = Math.ceil(party.players.length / party.settings.teamsCount);
  return maxTeamSize * party.settings.rotations * party.settings.teamsCount;
};

const isGameInProgress = (party) =>
  party.games.length && !party.games[party.games.length - 1].endTime;

const generateRandomTeamName = () => "team_" + Date.now();

export const createInProgressGame = (gamePhase) => {
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

// dev methods
export const getAllParties = () => {
  return PartyModel.find();
};
export const deleteParty = (slug) => {
  return PartyModel.deleteOne({ slug });
};
export const clearParties = () => {
  return PartyModel.deleteMany({});
};

// get party
export const getParty = (slug) => {
  return PartyModel.findOne({ slug });
};

// create party
export const createParty = ({ host, settings } = {}) => {
  const slug = `slug${Date.now()}`;
  const players = [host];
  const instance = new PartyModel({
    host,
    settings,
    slug,
    players,
  });
  return instance.save();
};

// join party
export const joinParty = async ({ slug, username }) => {
  const party = await getParty(slug);
  party.players.push(username);

  if (isGameInProgress(party)) {
    const { teams } = party.games[party.games.length - 1];

    const teamToAddPlayerTo = teams
      .map((team) => team.teamPlayers.length)
      .findIndex((el, _, arr) => el === Math.min(...arr));

    teams[teamToAddPlayerTo].teamPlayers.push(username);
  }

  return party.save();
};

// create game
export const createGame = async ({ slug }) => {
  const party = await getParty(slug);

  const teams = [...new Array(party.settings.teamsCount)].map(() => {
    return {
      teamName: generateRandomTeamName(),
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
    totalTurns: computeTotalTurns(party),
    turns: [],
  });

  return party.save();
};

// add prompt
export const addPrompt = async ({ slug, prompt, author }) => {
  const party = await getParty(slug);

  party.prompts.push({ author, prompt });

  return party.save();
};

// start game
export const startGame = async ({ slug }) => {
  const party = await getParty(slug);
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
export const startTurn = async ({ slug }) => {
  const party = await getParty(slug);
  const currentGame = party.games[party.games.length - 1];

  currentGame.turns[currentGame.turns.length - 1].startTime = Date.now() + 5000;

  return party.save();
};

// end turn
export const endTurn = async ({ slug, success }) => {
  const party = await getParty(slug);

  const currentGame = party.games[party.games.length - 1];

  const { teamIndex } = currentGame.turns[currentGame.turns.length - 1];

  const {
    playerIndex: currentPlayerIndex,
    teamPlayers: currentTeamPlayers,
  } = currentGame.teams[teamIndex];

  // add status and endtime to current game
  currentGame.turns[currentGame.turns.length - 1].endTime = Date.now();
  currentGame.turns[currentGame.turns.length - 1].success = success;

  // if last turn, end game
  if (currentGame.totalTurns === currentGame.turns.length) {
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
  } = currentGame.teams[nextTeamIndex];

  const randomPromptIndex = getRandomPromptIndex(
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

// rename team
export const renameTeam = async ({ slug, teamIndex, teamName }) => {
  const party = await getParty(slug);

  if (!isGameInProgress(party)) {
    return party;
  }

  const currentGame = party.games[party.games.length - 1];
  currentGame.teams[teamIndex].teamName = teamName;

  return party.save();
};

// update settings
export const updateSettings = async ({ slug, settings }) => {
  const party = await getParty(slug);

  if (isGameInProgress(party)) {
    // note this will cause updateSttings to fail silently.
    return party;
  }

  party.settings = {
    ...party.settings,
    ...settings,
  };

  return party.save();
};

// leave party
export const leaveParty = async ({ slug, username }) => {
  const party = await getParty(slug);

  party.players = party.players.filter((player) => player !== username);

  if (isGameInProgress(party)) {
    const currentGame = party.games[party.games.length - 1];

    currentGame.teams = currentGame.teams.map((team) => {
      team.teamPlayers = team.teamPlayers.filter(
        (player) => player !== username
      );
      return team;
    });
  }

  // what if user to remove is the current actor?

  return party.save();
};
