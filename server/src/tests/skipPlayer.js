import mongoose from "mongoose";

import { gameMethods, helpers, devMethods } from "../db/methods";

const { skipPlayer } = gameMethods;
const { createInProgressGame } = helpers;
const { clearParties } = devMethods;

export const skipPlayerTests = () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterEach(async () => {
    await clearParties();
  });

  it("should skip to the next play in current playerIndex", async () => {
    const party = await createInProgressGame("midGame");

    const newParty = await skipPlayer({
      slug: party.slug,
    });

    expect(
      newParty.games[0].turns[party.games[0].turns.length - 1].player
    ).toEqual("JILLY");
  });
};
