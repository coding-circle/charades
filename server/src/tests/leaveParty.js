import mongoose from "mongoose";

import { partyMethods, devMethods, gameMethods } from "../db/methods";

const { clearParties } = devMethods;

export const leavePartyTests = () => {
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

  it("should leave from players", async () => {});

  it("should end game if current turn is the last turn", async () => {});
};
