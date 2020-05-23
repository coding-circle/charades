import { gameMethods } from "../db/methods";

// add prompt
const addPrompt = async (req, res) => {
  const { slug } = req.params;
  const { author, prompt } = req.body;

  const party = await gameMethods.addPrompt({
    prompt,
    author,
    slug,
  });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

// create game
const createGame = async (req, res) => {
  const { slug } = req.params;

  const party = await gameMethods.createGame({ slug });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

// start game
const startGame = async (req, res) => {
  const { slug } = req.params;

  const party = await gameMethods.startGame({ slug });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

// start turn
const startTurn = async (req, res) => {
  const { slug } = req.params;

  const party = await gameMethods.startTurn({ slug });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

// end turn
const endTurn = async (req, res) => {
  const { slug } = req.params;
  const { success } = req.body;

  const party = await gameMethods.endTurn({ slug, success });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

// skip turn
const skipTurn = async (req, res) => {
  const { slug } = req.params;

  const party = await gameMethods.skipTurn({ slug });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

// rename team
const renameTeam = async (req, res) => {
  const { slug } = req.params;
  const { teamIndex, teamName } = req.body;

  const party = await gameMethods.renameTeam({ slug, teamIndex, teamName });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

export default {
  addPrompt,
  createGame,
  startGame,
  startTurn,
  endTurn,
  skipTurn,
  renameTeam,
};
