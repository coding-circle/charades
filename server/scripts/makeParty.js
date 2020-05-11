import mongoose from "mongoose";
import dotenv from "dotenv";
import { makeParty } from "../models/party.js";

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

async function run() {
  await makeParty();
  process.exit();
}

run();
