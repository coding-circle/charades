import mongoose from "mongoose";

import { partyMethods, devMethods, helpers } from "../db/methods";

const { clearParties } = devMethods;
const { createInProgressGame } = helpers;
const { leaveParty } = partyMethods;

export const leavePartyTests = () => {
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

  it("should leave from players", async () => {
    const { slug, players } = await createInProgressGame("midGame");

    const username = players[1];

    const party = await leaveParty({
      username,
      slug,
    });

    expect(party.players.includes(username)).toBeFalsy();
  });

  it("should leave from game", async () => {
    const { slug, players } = await createInProgressGame("midGame");

    const username = players[1];

    const party = await leaveParty({
      username,
      slug,
    });

    const teamPlayers = [
      ...party.games[0].teams[0].teamPlayers,
      ...party.games[0].teams[1].teamPlayers,
    ];

    expect(teamPlayers.includes(username)).toBeFalsy();
  });

  it("should re-assign the host", async () => {
    const { slug, players } = await createInProgressGame("midGame");

    const username = players[0];

    const party = await leaveParty({
      username,
      slug,
    });

    expect(party.players.includes(username)).toBeFalsy();
    expect(party.host).not.toEqual(username);
  });

  it("should change actorUp if person leaving is actorUp", async () => {
    const { slug, games } = await createInProgressGame("midGame");

    const oldTurn = games[0].turns[games[0].turns.length - 1];

    const party = await leaveParty({
      username: oldTurn.player,
      slug,
    });

    const newTurn = party.games[0].turns[party.games[0].turns.length - 1];

    expect(newTurn.player).not.toEqual(oldTurn.player);
  });
};
