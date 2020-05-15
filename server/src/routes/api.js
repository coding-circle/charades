import express from "express";

import {
  createParty,
  joinParty,
  getAllParties,
  clearParties,
  addPrompt,
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

// create party
router.post("/party", async (req, res) => {
  const { hostName = "player1", settings = {} } = req.body || {};
  const party = await createParty({ host: hostName, settings });
  res.status(200).send(party);
});

// join party
router.put("/party/:slug", async (req, res) => {
  const { slug } = req.params;
  const { username = null } = req.body || {};

  if (slug === null || username === null) {
    res.status(400).send("must pass a player name and a slug to join a party");
    return;
  }
  const party = await joinParty({ slug, username });
  res.status(200).send(party);
});

// add prompt
router.post("/party/:slug/prompt", async (req, res) => {
  const { slug } = req.params;
  const { author, prompt } = req.body;

  const party = await addPrompt({
    prompt,
    author,
    slug,
  });

  res.status(200).send(party);
});

// TODO add more routes here see documentation/RestAPI.md

export default router;
