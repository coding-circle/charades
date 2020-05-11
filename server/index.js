import http from "http";
import express from "express";
import dotenv from "dotenv";

import SocketService from "./services/socket.js";
import DbService from "./services/db.js";
import AppManager from "./AppManager.js";

import { PartyModel } from "./models/party.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

/* MARK: initializations */
const app = express();
const server = http.createServer(app);

const db = new DbService(process.env.MONGO_URI);
const socket = new SocketService(server);
const manager = new AppManager(socket, db);

/* MARK: middleware */
// TODO: break out into separate file, add more middleware:
//  - add `{ body: {} }` to post that don't have a body
//  - at some point we'll want sone security middleware

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // TODO: better cors handling
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

/* MARK: routes */
// TODO: create separate routes and controllers files
app.get("/", (req, res) => res.send("everyone is good enough"));

app.get("/parties", async (req, res) => {
  const parties = await manager.getParties();
  res.status(200).send(parties);
});

app.post("/parties", async (req, res) => {
  const { hostName = "player1", settings = {} } = req.body || {};
  const party = await manager.createParty(hostName, settings);
  console.log(party);
  res.status(200).send(party);
});

app.post("/parties/players", (req, res) => {
  const { playerName = "newplayer", partyId = "0000" } = req.body || {};
  manager.addPlayerToParty(playerName, partyId);
  res.status(200).send(partyId);
});

app.get("/parties/:id", (req, res) => {
  // get one party
});

app.post("/parties/:id/clues", (req, res) => {
  // a new clues to the party
});

app.post("/parties/:id/startGame", (req, res) => {
  // create a new game for the party
});

app.post("/parties/:id/startRound", (req, res) => {
  // start a new round for the party's active game
});

app.post("/parties/:id/endRound", (req, res) => {
  // a clue was guessed correctly, end the round and update the score
});

app.post("/parties/:id/signalPlayer/:player", (req, res) => {
  // signal that the guesser is pointing to a player
});

/* MARK: listen */
let port = process.env.PORT;
if (!port) {
  port = 4001;
  console.log("No port environment variable set. Using 4001.");
}

server.listen(port, () => {
  console.log(`Charades server listening on port ${port}`);
});
