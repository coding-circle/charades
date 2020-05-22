import { partyMethods } from "../db/methods";

// create party
const createParty = async (req, res) => {
  const { hostName = "player1", settings = {} } = req.body || {};

  const party = await partyMethods.createParty({
    host: hostName,
    settings,
  });

  res.status(200).send(party);
};

// join party
const joinParty = async (req, res) => {
  const { slug } = req.params;
  const { username = null } = req.body || {};

  if (slug === null || username === null) {
    res.status(400).send("must pass a player name and a slug to join a party");
    return;
  }

  const party = await partyMethods.joinParty({
    slug,
    username,
  });

  res.status(200).send(party);
};

export default {
  createParty,
  joinParty,
};
