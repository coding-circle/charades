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

  res.status(200).send("addPrompt success");
};

// create game
const createGame = async (req, res) => {
  const { slug } = req.params;
  const { keepSameTeams } = req.body;

  const party = await gameMethods.createGame({ slug, keepSameTeams });

  req.socket.broadcastParty(slug, party);

  res.status(200).send("createGame success");
};

// start game
const startGame = async (req, res) => {
  const { slug } = req.params;

  const party = await gameMethods.startGame({ slug });

  req.socket.broadcastParty(slug, party);

  res.status(200).send("startGame Success");
};

// start turn
const startTurn = async (req, res) => {
  const { slug } = req.params;

  const party = await gameMethods.startTurn({ slug });

  req.socket.broadcastParty(slug, party);

  res.status(200).send("startTurn success");
};

// end turn
const endTurn = async (req, res) => {
  const { slug } = req.params;
  const { success } = req.body;

  const party = await gameMethods.endTurn({ slug, success });

  req.socket.broadcastParty(slug, party);

  res.status(200).send("endTurn success");
};

// skip player
const skipPlayer = async (req, res) => {
  const { slug } = req.params;

  const party = await gameMethods.skipPlayer({ slug });

  req.socket.broadcastParty(slug, party);

  res.status(200).send("skipPlayer success");
};

// rename team
const renameTeam = async (req, res) => {
  const { slug } = req.params;
  const { teamIndex, teamName } = req.body;

  const party = await gameMethods.renameTeam({ slug, teamIndex, teamName });

  req.socket.broadcastParty(slug, party);

  res.status(200).send("renameTeam success");
};

export default {
  addPrompt,
  createGame,
  startGame,
  startTurn,
  endTurn,
  skipPlayer,
  renameTeam,
};
