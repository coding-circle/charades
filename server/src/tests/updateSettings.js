import mongoose from "mongoose";

import { partyMethods, devMethods, helpers } from "../db/methods";

const { clearParties } = devMethods;
const { updateSettings } = partyMethods;
const { createInProgressGame } = helpers;

export const updateSettingsTests = () => {
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

  it("it should not allow updating if game is in progress", async () => {
    const party = await createInProgressGame("midGame");

    const { settings: newSettings } = await updateSettings({
      slug: party.slug,
      settings: {
        rotations: 1000,
      },
    });

    expect(newSettings.rotations).toEqual(party.settings.rotations);
  });

  it("it should update settings when not in a game", async () => {
    const party = await createInProgressGame("lobby");

    const { settings } = await updateSettings({
      slug: party.slug,
      settings: {
        rotations: 1000,
      },
    });

    expect(settings.rotations).toEqual(1000);
  });

  it("it should update settings in post game lobby", async () => {
    const party = await createInProgressGame("postGame");

    const { settings } = await updateSettings({
      slug: party.slug,
      settings: {
        rotations: 1000,
      },
    });

    expect(settings.rotations).toEqual(1000);
  });
};
