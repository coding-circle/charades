import mongoose from "mongoose";
import _shuffle from "lodash/shuffle";

import PartyModel from "../model";
import helpers from "./helpers";

// get party
const getParty = ({ slug }) => {
  return PartyModel.findOne({ slug });
};

// create party
const createParty = async ({ host, settings } = {}) => {
  const tryCreate = () => {
    const slug = helpers.generateSlug();
    const players = [host];
    const instance = new PartyModel({
      host,
      settings,
      slug,
      players,
    });
    return instance.save();
  };

  // It's possible that creating a party wont work because
  // we generate a slug that's already in the db. Check for
  // this error and in that case try to create the party again
  while (true) {
    try {
      return await tryCreate();
    } catch (e) {
      // This specific error code is for breaking the unique constraint.
      // If we catch this error, try again.
      if (e.code == 11000 && e.name == "MongoError") {
        console.log("Created a duplicate slug. Trying again...");
      } else {
        throw e;
      }
    }
  }
};

// join party
const joinParty = async ({ slug, username }) => {
  const party = await getParty({ slug });

  if (!party) return { error: "Party does not exist" };

  party.players.push(username);

  if (helpers.isGameInProgress(party)) {
    const { teams } = party.games[party.games.length - 1];

    const teamToAddPlayerTo = teams
      .map((team) => team.teamPlayers.length)
      .findIndex((el, _, arr) => el === Math.min(...arr));

    teams[teamToAddPlayerTo].teamPlayers.push(username);
  }

  return party.save();
};

// update settings
const updateSettings = async ({ slug, settings }) => {
  const party = await getParty({ slug });

  if (helpers.isGameInProgress(party)) {
    // note this will cause updateSttings to fail silently.
    return party;
  }

  party.settings = {
    ...party.settings,
    ...settings,
  };

  return party.save();
};

// leave party
const leaveParty = async ({ slug, username }) => {
  const party = await getParty({ slug });

  party.players = party.players.filter((player) => player !== username);

  if (helpers.isGameInProgress(party)) {
    const currentGame = party.games[party.games.length - 1];

    currentGame.teams = currentGame.teams.map((team) => {
      team.teamPlayers = team.teamPlayers.filter(
        (player) => player !== username
      );
      return team;
    });
  }

  // what if user to remove is the current actor?

  return party.save();
};

export default {
  getParty,
  createParty,
  joinParty,
  updateSettings,
  leaveParty,
};
