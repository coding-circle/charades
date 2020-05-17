import mongoose from "mongoose";

import {
  createParty,
  clearParties,
  addPrompt,
  createInProgressGame,
  updateSettings,
} from "../models/party";

export const updateSettingsTests = () => {
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

  it("it should not allow updating if game is in progress", async () => {
    const party = await createInProgressGame("midGame");

    const { settings } = await updateSettings({
      slug: party.slug,
      settings: {
        rotations: 1000,
      },
    });

    expect(settings.rotations).toEqual(party.settings.rotations);
  });

  it("it should update settings when not in a game", async () => {});
};
