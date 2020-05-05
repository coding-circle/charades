import mongoose from "mongoose";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

let mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  console.log("MONGO_URI environment variable not found!!");
}

// This is just the beginning of the schema laid out in the README
const Game = new mongoose.Schema(
  {
    partySlug: String,
    players: [String],
  },
  { timestamps: true }
);

const GameModel = mongoose.model("Game", Game);

const makeGame = (
  callback,
  partySlug = "asdf",
  players = ["jacten", "n8", "ders", "andy"]
) => {
  const instance = new GameModel({
    partySlug: partySlug,
    players: players,
  });
  instance.save(callback);
};

const clearGames = (callback) => {
  GameModel.deleteMany({}, callback);
};

export { GameModel, makeGame, clearGames };
