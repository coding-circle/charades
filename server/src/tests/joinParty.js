import mongoose from "mongoose";

import { partyMethods, devMethods, gameMethods } from "../db/methods";

const { joinParty, createParty } = partyMethods;
const { createGame } = gameMethods;
const { clearParties } = devMethods;

export const joinPartyTests = () => {
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

  it("it should add a player to the players array", async () => {
    const { slug } = await createParty({
      host: "jacten",
    });

    const party = await joinParty({ username: "bobanya", slug });

    expect(party.players.includes("bobanya")).toBeTruthy();
  });

  it("it should add a player to the team with fewest members when teams are uneven", async () => {
    const { slug } = await createParty({ host: "bobanya" });

    await joinParty({ username: "paul", slug });
    await joinParty({ username: "ringo", slug });
    await joinParty({ username: "john", slug });
    await joinParty({ username: "george", slug });
    await createGame({ slug });

    const party = await joinParty({ username: "coolBeans", slug });
    const { teamPlayers } = party.games[0].teams[1];

    expect(teamPlayers.length).toEqual(3);
    expect(teamPlayers.includes("coolBeans")).toBeTruthy();
  });

  it("it should add a player to the first team if teams are even", async () => {});
};
