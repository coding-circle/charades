import mongoose from "mongoose";

import { partyMethods, devMethods, gameMethods } from "../db/methods";

const { clearParties } = devMethods;

export const addPromptTests = () => {
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

  it("should set startTime on the game", async () => {});

  it("should remove a prompt from prompts array", async () => {});

  it("should create turn object", async () => {});
};
