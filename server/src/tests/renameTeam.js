import mongoose from "mongoose";

import { gameMethods, devMethods, helpers } from "../db/methods";

const { clearParties } = devMethods;
const { renameTeam } = gameMethods;
const { createInProgressGame } = helpers;

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

  it("should rename team at any point during the game", async () => {
    const party = await createInProgressGame("midGame");

    const updatedParty = await renameTeam({
      slug: party.slug,
      teamIndex: 0,
      teamName: "Jack's All Star Cat Parade",
    });

    const updatedPartyTeamName = updatedParty.games[0].teams[0].teamName;
    expect(updatedPartyTeamName).toEqual("Jack's All Star Cat Parade");
  });

  it("should not rename your team after the game is finished", async () => {
    const party = await createInProgressGame("postGame");

    const updatedParty = await renameTeam({
      slug: party.slug,
      teamIndex: 0,
      teamName: "Jack's All Star Cat Parade",
    });

    const updatedPartyTeamName = updatedParty.games[0].teams[0].teamName;
    expect(updatedPartyTeamName).toEqual(party.games[0].teams[0].teamName);
  });
};
