import mongoose from "mongoose";

import { partyMethods, devMethods, helpers } from "../db/methods";

const { clearParties } = devMethods;
const { createParty, getParty } = partyMethods;

export const createPartyTests = () => {
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

  it("should create party when provided host", async () => {
    const { host, slug, players } = await createParty({
      host: "jacten",
    });

    expect(slug).toBeTruthy();
    expect(host.slice(0, -7)).toEqual("JACTEN");
    expect(players).toEqual(expect.arrayContaining([host]));
  });

  it("should throw error when host is not provided", async () => {
    expect.assertions(1);
    try {
      await createParty();
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
    };

    const party = await createParty({
      host: "JACTEN",
      settings,
    });

    expect(party.settings).toEqual(settings);
  });

  it("should persist party object in db", async () => {
    const createdParty = await createParty({
      host: "JACTEN",
    });

    const retreivedParty = await getParty({ slug: createdParty.slug });

    expect(retreivedParty.slug).toEqual(createdParty.slug);
    expect(retreivedParty.host).toEqual(createdParty.host);
    expect(retreivedParty.settings).toEqual(
      expect.objectContaining(createdParty.settings)
    );
    expect(retreivedParty.players).toEqual(
      expect.arrayContaining(createdParty.players)
    );
  });

  it("should generate lots of random party slugs in the right format", async () => {
    const count = 100;
    const duplicatesAllowed = 10;
    const slugSet = new Set();
    for (let i = 0; i < count; i++) {
      const slug = helpers.generateSlug();
      expect(slug.length).toBe(6);
      slugSet.add(slug);
    }
    expect(slugSet.size).toBeGreaterThan(count - duplicatesAllowed);
  });

  it("should generate reasonably random team names in the right format", async () => {
    const count = 100;
    const duplicatesAllowed = 10;
    const teamNamesSet = new Set();
    for (let i = 0; i < count; i++) {
      const teamName = helpers.generateRandomTeamName();
      expect(teamName.length).toBeLessThanOrEqual(10);
      teamNamesSet.add(teamName);
    }
    expect(teamNamesSet.size).toBeGreaterThan(count - duplicatesAllowed);
  });
};
