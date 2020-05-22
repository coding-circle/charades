import express from "express";

import devController from "../controllers/dev";
import partyController from "../controllers/party";
import gameController from "../controllers/game";

const router = express.Router();

// dev only
router.get("/party", devController.getAllParties);
router.get("/clear-parties", devController.clearAllParties);

// party
router.post("/party", partyController.createParty);
router.put("/party/:slug", partyController.joinParty);

// game
router.post("/party/:slug/prompt", gameController.addPrompt);

export default router;
