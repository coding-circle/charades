import mongoose from "mongoose";

import { partyMethods, devMethods, gameMethods, helpers } from "../db/methods";

const { clearParties } = devMethods;
const { startGame } = gameMethods;
const { createInProgressGame } = helpers;

export const startGameTests = () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await clearParties();
  });

  it("should set startTime on the game", async () => {
    const { slug } = await createInProgressGame("prompt");

    const updatedParty = await startGame({ slug });
    expect(updatedParty.games[0].startTime).toBeTruthy();
  });

  it("should remove a prompt from prompts array", async () => {});

  it("should create turn object", async () => {});
};
