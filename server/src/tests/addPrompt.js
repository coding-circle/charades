import mongoose from "mongoose";

import { createParty, clearParties, addPrompt } from "../models/party";

export const addPromptTests = () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await clearParties();
  });

  it("it should add a prompt to the prompts array", async () => {
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
