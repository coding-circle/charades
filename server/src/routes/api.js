import express from "express";

import { PartyModel } from "../models/party.js";

const router = express.Router();

router.get("/parties", async (req, res) => {
  const parties = await manager.getParties();
  res.status(200).send(parties);
});

router.post("/parties", async (req, res) => {
  const { hostName = "player1", settings = {} } = req.body || {};
  const party = await manager.createParty(hostName, settings);
  console.log(party);
  res.status(200).send(party);
});

router.post("/parties/players", (req, res) => {
  const { playerName = "newplayer", partyId = "0000" } = req.body || {};
  manager.addPlayerToParty(playerName, partyId);
  res.status(200).send(partyId);
});

router.get("/parties/:id", (req, res) => {
  // get one party
});

router.post("/parties/:id/clues", (req, res) => {
  // a new clues to the party
});

router.post("/parties/:id/startGame", (req, res) => {
  // create a new game for the party
});

router.post("/parties/:id/startRound", (req, res) => {
  // start a new round for the party's active game
});

router.post("/parties/:id/endRound", (req, res) => {
  // a clue was guessed correctly, end the round and update the score
});

router.post("/parties/:id/signalPlayer/:player", (req, res) => {
  // signal that the guesser is pointing to a player
});

export default router;
