import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// create party
const createParty = async ({ host }) => {
  try {
    const res = await axios.post(`${API_URL}party`, {
      host,
    });

    return res.data;
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
    return { error: error.response.data };
  }
};

const addPrompt = async ({ slug, author, prompt }) => {
  const res = await axios.post(`${API_URL}party/${slug}/prompt`, {
    author,
    prompt,
  });
};

export default {
  createParty,
  joinParty,
  addPrompt,
};
