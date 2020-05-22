import mongoose from "mongoose";

import { devMethods } from "../db/methods";

const { clearParties } = devMethods;

export const endTurnTests = () => {
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

  it("should end turn and create next turn if mid-game", async () => {});

  it("should end game if current turn is the last turn", async () => {});
};
