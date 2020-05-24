import { partyMethods } from "../db/methods";

// create party
const createParty = async (req, res) => {
  const { host, settings } = req.body;

  const party = await partyMethods.createParty({
    host,
    settings,
  });

  req.socket.create(party.slug, party);

  res.status(200).send(party.slug);
};

// join party
const joinParty = async (req, res) => {
  const { slug } = req.params;
  const { username } = req.body;

  if (!slug || !username) {
    return res.status(400).send("Missing Info");
  }

  const party = await partyMethods.joinParty({
    slug,
    username,
  });

  if (party.error) {
    return res.status(500).send(party.error);
  }

  req.socket.broadcastParty(slug, party);

  res.status(200).send("joined party");
};

// get party
const getParty = async (req, res) => {
  const { slug } = req.params;

  const party = await partyMethods.getParty({ slug });

  res.status(200).send(party);
};

// update settings
const updateSettings = async (req, res) => {
  const { slug } = req.params;
  const settings = ({ rotations, turnDuration, teamsCount } = req.body);

  const party = await partyMethods.updateSettings({
    slug,
    settings,
  });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

// leave party
const leaveParty = async (req, res) => {
  const { slug } = req.params;
  const { username } = req.body;

  const party = await partyMethods.leaveParty({ slug, username });

  req.socket.broadcastParty(slug, party);

  res.status(200);
};

export default {
  createParty,
  joinParty,
  getParty,
  updateSettings,
  leaveParty,
};
