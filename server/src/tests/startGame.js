import mongoose from "mongoose";

import { createParty, clearParties, addPrompt } from "../models/party";

export const addPromptTests = () => {
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

  it("should set startTime on the game", async () => {});

  it("should remove a prompt from prompts array", async () => {});

  it("should create turn object", async () => {});
};
