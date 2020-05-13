import express from "express";

import {
  PartyModel,
  makeParty,
  getParty,
  getAllParties,
  clearParties,
} from "../models/party.js";

const router = express.Router();

// leaving these here for testing ease purposes
// get rid of them someday
router.get("/party", async (req, res) => {
  const parties = await getAllParties();
  res.status(200).send(parties);
});
router.get("/clear-parties", async (req, res) => {
  await clearParties();
  res.status(200).send("parties cleared.");
});

router.post("/party", async (req, res) => {
  const { hostName = "player1", settings = {} } = req.body || {};
  const party = await makeParty({ host: hostName, settings });
  res.status(200).send(party);
});

router.put("/party", async (req, res) => {
  const { slug = null, playerName = null } = req.body || {};

  if (slug == null || playerName == null) {
    res.status(400).send("must pass a player name and a slug to join a party");
    return;
  }
  // TODO this does not currently actually join the party
  // add something like this when ready: await joinParty(slug, playerName);
  const party = await getParty(slug);
  res.status(200).send(party);
});

// TODO add more routes here see documentation/RestAPI.md

export default router;
