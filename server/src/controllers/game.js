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

  res.status(200).send(party);
};

// create game
const createGame = async (req, res) => {};

// start game
const startGame = async (req, res) => {};

// start turn
const startTurn = async (req, res) => {};

// end turn
const endTurn = async (req, res) => {};

// skip turn
const skipTurn = async (req, res) => {};

// rename team
const renameTeam = async (req, res) => {};

export default {
  addPrompt,
  createGame,
  startGame,
  startTurn,
  endTurn,
  skipTurn,
  renameTeam,
};
