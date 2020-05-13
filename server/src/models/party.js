import mongoose from "mongoose";
import _shuffle from "lodash/shuffle";

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
  party.games.length && !party.games[games.length].endTime;

const generateRandomTeamName = () => "team_" + Date.now();

export const makeParty = ({ host, settings } = {}) => {
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

export const joinParty = async ({ slug, username }) => {
  const party = await getParty(slug);
  party.players.push(username);

  if (isGameInProgress(party)) {
    const { teams } = party.games[games.length];

    let largestTeamPlayersAmount = 0;
    let teamToAddIntoIndex = 0;

    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      if (team.teamPlayers.length > largestTeamPlayersAmount) {
        largestTeamPlayersAmount = team.teamPlayers.length;
        teamToAddIntoIndex = i;
      }
    }

    party.games[games.length].teams[teamToAddIntoIndex].push(username);
  }

  return party.save();
};

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

export const getParty = (slug) => {
  return PartyModel.findOne({ slug });
};

export const deleteParty = (slug) => {
  return PartyModel.deleteOne({ slug });
};

export const clearParties = () => {
  return PartyModel.deleteMany({});
};
