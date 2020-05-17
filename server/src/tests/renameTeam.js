import mongoose from "mongoose";

import {
  clearParties,
  createInProgressGame,
  renameTeam,
} from "../models/party";

export const renameTeamTests = () => {
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

  it("should...", async () => {});
};
