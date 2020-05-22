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
    });
  });

  afterAll(async () => {
    await clearParties();
  });

  it("should adds success status and creates new turn", async () => {
    const party = await createInProgressGame("midGame");

    const nextTurnParty = await endTurn({
      slug: party.slug,
      success: true,
    });
    
    const currentTurn = nextTurnParty.games[0].turns.length-2;
    expect(nextTurnParty.games[0].turns[currentTurn].success).toBeTruthy();
  });

  it("should add endTime and creates new turn", async () => {
    const party = await createInProgressGame("midGame");

  // if it's not null, it should just check if there's a time, not create one 
    
    const nextTurnParty = await endTurn({
      slug: party.slug,
      endTime: 1588558102804,
      success:true,
    });

    const currentTurn = nextTurnParty.games[0].turns.length-2;
  
    expect(nextTurnParty.games[0].turns[currentTurn].endTime);
  });

  it("should choose the next player from the next team", async () => {
    const party = await createInProgressGame("midGame");

    const nextTurnParty = await endTurn({
      slug: party.slug,
      endTime: 1588558102804,
      success: true,
    });

    const newCurrentTurn = nextTurnParty.games[0].turns.length-1;
    expect(nextTurnParty.games[0].turns[newCurrentTurn].player);
});

// it("should provide the player with a prompt authored by a player from a different team", async () => {
//   const party = await createInProgressGame("midGame");


// });

// it("should remove prompt from list", async () => {
//     const party = await createInProgressGame("midGame");

    
// });

// it("should be less than or equal to the total number of turns", async () => {
//   const party = await createInProgressGame("midGame");

//   const currentTurnNumber = await 

// });

// it("should end game if current turn is the last turn", async () => {
//   const party = await createInProgressGame("postGame");

  
// });


};
