import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// get party
const getParty = async ({ slug }) => {
  try {
    const res = await axios.get(`${API_URL}party/${slug}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// create party
const createParty = async ({ host, settings }) => {
  try {
    const res = await axios.post(`${API_URL}party`, {
      host,
      settings,
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};

// join party
const joinParty = async ({ slug, username }) => {
  try {
    const res = await axios.put(`${API_URL}party/${slug}`, {
      username,
    });

    return res;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    return { error: errorMessage };
  }
};

// update settings
const updateSettings = async ({ slug, settings }) => {
  console.log(settings);

  const res = await axios.put(`${API_URL}party/${slug}/settings`, {
    settings,
  });

  return res;
};

// leave party
const leaveParty = async ({ slug, username }) => {
  const res = await axios.delete(`${API_URL}party/${slug}/leave`, {
    username,
  });

  return res;
};

// create game
const createGame = async ({ slug }) => {
  const res = await axios.post(`${API_URL}party/${slug}/game/create`);

  return res;
};

// add prompt
const addPrompt = async ({ slug, author, prompt }) => {
  const res = await axios.post(`${API_URL}party/${slug}/prompt`, {
    author,
    prompt,
  });

  return res;
};

// start game
const startGame = async ({ slug }) => {
  const res = await axios.put(`${API_URL}party/${slug}/game/start`);

  return res;
};

// start turn
const startTurn = async ({ slug }) => {
  const res = await axios.put(`${API_URL}party/${slug}/turn/start`);

  return res;
};

// end turn
const endTurn = async ({ slug, success }) => {
  const res = await axios.put(`${API_URL}party/${slug}/turn/end`, {
    success,
  });

  return res;
};

// skip turn
const skipTurn = async ({ slug }) => {
  const res = await axios.put(`${API_URL}party/${slug}/turn/skip`);

  return res;
};

// rename team
const renameTeam = async ({ slug, teamIndex, teamName }) => {
  const res = await axios.put(`${API_URL}party/${slug}/rename`, {
    teamIndex,
    teamName,
  });

  return res;
};

export default {
  // party
  getParty,
  createParty,
  joinParty,
  updateSettings,
  leaveParty,

  // game
  addPrompt,
  createGame,
  startGame,
  startTurn,
  endTurn,
  skipTurn,
  renameTeam,
};
