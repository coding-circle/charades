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
router.get("/party/:slug", partyController.getParty);
router.put("/party/:slug/settings", partyController.updateSettings);
router.delete("/party/:slug/leave", partyController.leaveParty);

// game
router.post("/party/:slug/game/create", gameController.createGame);
router.post("/party/:slug/prompt", gameController.addPrompt);
router.put("party/:slug/game/start", gameController.startGame);
router.put("party/:slug/turn/start", gameController.startTurn);
router.put("party/:slug/turn/end", gameController.endTurn);
router.put("party/:slug/turn/skip", gameController.skipTurn);
router.put("party/:slug/rename", gameController.renameTeam);

export default router;
