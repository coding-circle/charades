import mongoose from "mongoose";

const Party = new mongoose.Schema(
  {
    slug: { type: String, unique: true, index: true },
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
    },
    games: [
      {
        startTime: { type: Date, default: null },
        endTime: { type: Date, default: null },
        teams: [
          {
            teamName: { type: String, required: true },
            teamPlayers: [String],
            teamColor: String,
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

const PartyModel = mongoose.model("Party", Party);

export default PartyModel;
