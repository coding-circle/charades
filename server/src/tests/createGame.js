import mongoose from "mongoose";

import { partyMethods, gameMethods, devMethods } from "../db/methods";

const { joinParty, createParty } = partyMethods;
const { clearParties } = devMethods;
const { createGame } = gameMethods;

export const createGameTests = () => {
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

  it("should create a game when provided a slug", async () => {
    const party = await createParty({ host: "bobanya " });
    const updatedParty = await createGame({ slug: party.slug });

    expect(updatedParty.games.length).toEqual(1);
  });

  it("should compute the total turns based on number of players", async () => {
    const { slug } = await createParty({
      host: "bobanya",
      settings: {
        rotations: 5,
      },
    });

    await joinParty({ username: "paul", slug });
    await joinParty({ username: "ringo", slug });
    await joinParty({ username: "john", slug });
    await joinParty({ username: "george", slug });

    const party = await createGame({ slug });

    expect(party.games[0].totalTurns).toEqual(30);
  });

  it("should evenly distribute players across teams", async () => {
    const { slug } = await createParty({ host: "bobanya" });

    await joinParty({ username: "paul", slug });
    await joinParty({ username: "ringo", slug });
    await joinParty({ username: "john", slug });
    await joinParty({ username: "george", slug });
    await joinParty({ username: "tom", slug });
    await joinParty({ username: "bob", slug });
    await joinParty({ username: "frogger", slug });
    await joinParty({ username: "doug", slug });

    const party = await createGame({ slug });

    expect(party.games[0].teams[0].teamPlayers.length).toEqual(5);
    expect(party.games[0].teams[1].teamPlayers.length).toEqual(4);
  });

  it("should create a color for the team", async () => {
    const { slug } = await createParty({
      host: "james",
    });

    await joinParty({ username: "paul", slug });
    await joinParty({ username: "ringo", slug });
    await joinParty({ username: "john", slug });
    await joinParty({ username: "george", slug });

    const party = await createGame({ slug });

    expect("hsl").toEqual(party.games[0].teams[0].teamColor.substring(0, 3));
    expect("hsl").toEqual(party.games[0].teams[1].teamColor.substring(0, 3));
  });

  it("should keep same teams when keepSameTeams is true", async () => {});
};
