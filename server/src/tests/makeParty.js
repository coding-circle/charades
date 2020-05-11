import mongoose from "mongoose";

import {
  makeParty,
  deleteParty,
  getParty,
  clearParties,
  Party,
} from "../models/party";

export const makePartyTests = () => {
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

  it("should create party when provided host", async () => {
    const party = await makeParty({
      host: "jacten",
    });

    expect(party.slug).toBeTruthy();
    expect(party.host).toEqual("jacten");
    expect(party.players).toEqual(expect.arrayContaining(["jacten"]));
  });

  it("should throw error when host is not provided", async () => {
    expect.assertions(1);
    try {
      await makeParty();
    } catch (error) {
      expect(error.message).toBe(
        "Party validation failed: host: Path `host` is required."
      );
    }
  });

  it("should allow settings to be added", async () => {
    const settings = {
      rotations: 3,
      teamsCount: 4,
      turnDurationSeconds: 300,
      autoStart: true,
    };

    const party = await makeParty({
      host: "jacten",
      settings,
    });

    expect(party.settings).toEqual(settings);
  });

  it("should persist party object in db", async () => {
    const createdParty = await makeParty({
      host: "jacten",
    });

    const retreivedParty = await getParty(createdParty.slug);

    expect(retreivedParty.slug).toEqual(createdParty.slug);
    expect(retreivedParty.host).toEqual(createdParty.host);
    expect(retreivedParty.settings).toEqual(
      expect.objectContaining(createdParty.settings)
    );
    expect(retreivedParty.players).toEqual(
      expect.arrayContaining(createdParty.players)
    );
  });
};
