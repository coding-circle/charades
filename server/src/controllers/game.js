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

export default { addPrompt };
