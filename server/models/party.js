import mongoose from "mongoose";

// This is just the beginning of the schema laid out in the README
const Party = new mongoose.Schema(
  {
    partySlug: String,
    players: [String],
  },
  { timestamps: true }
);

export const PartyModel = mongoose.model("Party", Party);

export const makeParty = (
  settings = {},
  partySlug = "asdf",
  players = ["jacten", "n8", "ders", "andy"]
) => {
  const instance = new PartyModel({
    partySlug: partySlug,
    players: players,
  });
  return instance.save();
};

export const clearParties = () => {
  return PartyModel.deleteMany({});
};