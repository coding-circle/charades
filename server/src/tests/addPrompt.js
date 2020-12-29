import mongoose from "mongoose";

import { partyMethods, gameMethods, devMethods } from "../db/methods";

const { clearParties } = devMethods;
const { createParty } = partyMethods;
const { addPrompt } = gameMethods;

export const addPromptTests = () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await clearParties();
  });

  it("should add a prompt to the prompts array", async () => {
    const { slug } = await createParty({ host: "andy" });

    const expectedPrompt = {
      author: "andy",
      prompt: "A Fish Called Wanda",
    };

    const party = await addPrompt({
      ...expectedPrompt,
      slug,
    });

    expect(expect.objectContaining(expectedPrompt)).toEqual(party.prompts[0]);
  });
};
