import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  getParty,
  makeParty,
  deleteParty,
  createGame,
} from "../models/party.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

let mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  console.log("MONGO_URI environment variable not found!!");
}

async function testSettings() {
  let party = await makeParty();

  party.settings.rotations = 10;
  party.settings.turnDurationSeconds = 1337;
  await party.save();

  let sameParty = await getParty(party.slug);
  console.log(sameParty);

  // get a new one
  process.exit();
}

async function testCreateGame() {
  let party = await makeParty();
  console.log(party);

  await createGame(party.slug);

  let party2 = await getParty(party.slug);
  console.log(party2);

  await deleteParty(party.slug);
  // get a new one
  process.exit();
}

testCreateGame();
