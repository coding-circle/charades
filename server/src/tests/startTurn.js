import mongoose from "mongoose";

import {
  createParty,
  clearParties,
  addPrompt,
  createInProgressGame,
  startTurn,
} from "../models/party";

export const startTurnTests = () => {
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

  it("should add a start time", async);
};
