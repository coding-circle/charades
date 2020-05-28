import mongoose from "mongoose";

import { gameMethods, helpers, devMethods } from "../db/methods";

const { endTurn } = gameMethods;
const { createInProgressGame } = helpers;
const { clearParties } = devMethods;

export const endTurnTests = () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterEach(async () => {
    await clearParties();
  });

  it("should adds success status and creates new turn", async () => {
    const { slug } = await createInProgressGame("midGame");

    const party = await endTurn({
      success: true,
      slug,
    });

    const turnIndex = party.games[0].turns.length - 2;

    expect(party.games[0].turns[turnIndex].success).toBeTruthy();
  });

  it("should add endTime and creates new turn", async () => {
    const { slug } = await createInProgressGame("midGame");

    const party = await endTurn({
      success: true,
      slug,
    });

    const turnIndex = party.games[0].turns.length - 2;

    expect(party.games[0].turns[turnIndex].endTime);
  });

  it("should choose the next player from the next team", async () => {
    const { slug } = await createInProgressGame("midGame");

    const party = await endTurn({
      success: true,
      slug,
    });

    const turnIndex = party.games[0].turns.length - 1;
    expect(party.games[0].turns[turnIndex].player);
  });

  it("should provide the player with a prompt authored by a player from a different team", async () => {
    const { slug } = await createInProgressGame("midGame");

    for (let i = 0; i <= 10; i++) {
      const party = await endTurn({
        success: true,
        slug,
      });

      const currentGame = party.games[0];
      const { teamIndex, author } = currentGame.turns[
        currentGame.turns.length - 1
      ];

      const playerAndAuthorOnSameTeam = currentGame.teams[
        teamIndex
      ].teamPlayers.includes(author);

      expect(playerAndAuthorOnSameTeam).toBeFalsy();
    }
  });

  // it("should remove prompt from list", async () => {
  //     const { slug } = await createInProgressGame("midGame");

  // });

  // it("should be less than or equal to the total number of turns", async () => {
  //   const { slug } = await createInProgressGame("midGame");

  //   const currentTurnNumber = await

  // });

  // it("should end game if current turn is the last turn", async () => {
  //   const { slug } = await createInProgressGame("postGame");

  // });
};
