import { partyMethods } from "../db/methods";

// create party
const createParty = async (req, res) => {
  // const { host, settings } = req.body;
  const host = "Andy";
  const settings = {};

  const party = await partyMethods.createParty({
    host,
    settings,
  });

  req.socket.create(party.slug);

  await res.status(200);
};

// join party
const joinParty = async (req, res) => {
  const { slug } = req.params;
  const { username } = req.body;

  if (!!slug || !!username) {
    res.status(400).send("must pass a player name and a slug to join a party");
    return;
  }

  const party = await partyMethods.joinParty({
    slug,
    username,
  });

  // TODO: Check for unique username

  req.socket.broadcastParty(slug, party);

  res.status(200);
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
