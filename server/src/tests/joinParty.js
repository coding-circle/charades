import mongoose from "mongoose";

import { makeParty, joinParty, clearParties } from "../models/party";

export const joinPartyTests = () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await clearParties();
  });

  it("it should add a player to the players array", async () => {
    const party = await makeParty({
      host: "jacten",
    });

    const updatedParty = await joinParty({
      slug: party.slug,
      username: "bobanya",
    });

    expect(updatedParty.players.includes("bobanya")).toBeTruthy();
  });

  it("it should add a player to the team with fewest members when teams are uneven", async () => {});

  it("it should add a player to the first team if teams are evens", async () => {});
};
