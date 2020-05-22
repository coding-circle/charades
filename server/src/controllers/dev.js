import { devMethods } from "../db/methods";

const isDevelopment = process.env.NODE_ENV !== "production";

// get all parties
const getAllParties = async (req, res) => {
  if (isDevelopment) {
    return res.status(400).send("ACCESS DENIED: dev only method");
  }

  const parties = await devMethods.getAllParties();
  res.status(200).send(parties);
};

// clear all parties
const clearAllParties = async (req, res) => {
  if (isDevelopment) {
    return res.status(400).send("ACCESS DENIED: dev only method");
  }

  await devMethods.clearParties();
  res.status(200).send("parties cleared.");
};

export default { getAllParties, clearAllParties };
