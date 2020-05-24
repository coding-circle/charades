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

const addPrompt = async ({ slug, author, prompt }) => {
  const res = await axios.post(`${API_URL}party/${slug}/prompt`, {
    author,
    prompt,
  });

  return res;
};

export default {
  getParty,
  createParty,
  joinParty,
  addPrompt,
};
