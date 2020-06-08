import express from "express";
import ash from "express-async-handler";

import devController from "../controllers/dev";
import partyController from "../controllers/party";
import gameController from "../controllers/game";

const router = express.Router();

// dev only
router.get("/party", ash(devController.getAllParties));
router.get("/clear-parties", ash(devController.clearAllParties));

// party
router.post("/party", ash(partyController.createParty));
router.put("/party/:slug", ash(partyController.joinParty));
router.get("/party/:slug", ash(partyController.getParty));
router.put("/party/:slug/settings", ash(partyController.updateSettings));
router.put("/party/:slug/leave", ash(partyController.leaveParty));

// game
router.post("/party/:slug/prompt", ash(gameController.addPrompt));
router.post("/party/:slug/game/create", ash(gameController.createGame));
router.put("/party/:slug/game/start", ash(gameController.startGame));
router.put("/party/:slug/turn/start", ash(gameController.startTurn));
router.put("/party/:slug/turn/end", ash(gameController.endTurn));
router.put("/party/:slug/turn/skip", ash(gameController.skipTurn));
router.put("/party/:slug/rename", ash(gameController.renameTeam));

export default router;
