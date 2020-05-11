import mongoose from "mongoose";

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
            teamPlayers: {
              type: [String],
              validate: {
                // NOTE: We are not sure if this validator will work in the future
                // if somebody leaves or joins the party
                validator: function (teamPlayers) {
                  return teamPlayers.every((teamPlayer) => {
                    return this.players.includes(teamPlayer);
                  });
                },
                message:
                  "players inside teamPlayers must also be in the party's players",
              },
            },
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

const computeTotalTurns = (party) => {
  let maxTeamSize = Math.ceil(party.players.length / party.settings.teamsCount);
  return maxTeamSize * party.settings.rotations * party.settings.teamsCount;
};

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

export const createGame = async (slug) => {
  let party = await getParty(slug);
  party.games.push({
    teams: [], // TODO: actually assign teams
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
