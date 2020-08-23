import mongoose from "mongoose";
import _shuffle from "lodash/shuffle";

import PartyModel from "../model";
import helpers from "./helpers";

// get party
const getParty = ({ slug }) => {
  return PartyModel.findOne({ slug });
};

// create party
const createParty = async ({ host = "", settings } = {}) => {
  const tryCreate = () => {
    const slug = helpers.generateSlug();
    const uuid = helpers.generateUUID();
    const upperCaseHost = host.toUpperCase();

    const uniqueHost = upperCaseHost ? `${upperCaseHost}_${uuid}` : "";

    const instance = new PartyModel({
      host: uniqueHost,
      players: [uniqueHost],
      settings,
      slug,
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
  const party = await getParty({ slug: slug.toUpperCase() });
  // party doesn't exist (invalid game code)
  if (!party)
    return {
      error: "Party does not exist. Check the spelling on your room code.",
    };

  const upperCaseUsername = username.toUpperCase();
  const uuid = helpers.generateUUID();
  const uniqueUsername = `${upperCaseUsername}_${uuid}`;

  const playerNames = party.players.map((player) => player.slice(0, -7));

  // duplicate user exists
  if (playerNames.includes(upperCaseUsername)) {
    return { error: "User already exists. Enter a different username." };
  }

  party.players.push(uniqueUsername);

  if (helpers.isGameInProgress(party)) {
    const { teams } = party.games[party.games.length - 1];

    const teamToAddPlayerTo = teams
      .map((team) => team.teamPlayers.length)
      .findIndex((el, _, arr) => el === Math.min(...arr));

    teams[teamToAddPlayerTo].teamPlayers.push(uniqueUsername);
  }

  const party = await party.save();

  return {
    party,
    username: uniqueUsername,
  };
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
      let indexOfPlayer = null;
      team.teamPlayers = team.teamPlayers.filter((player, index) => {
        if (player === username) {
          indexOfPlayer = index;
          return false;
        }
        return true;
      });

      // reset player index if it's pointing at an index that doesn't exist
      if (indexOfPlayer !== null && team.playerIndex >= indexOfPlayer) {
        let newPlayerIndex = team.playerIndex;
        if (team.playerIndex > indexOfPlayer) {
          newPlayerIndex--;
        }

        if (newPlayerIndex > team.teamPlayers.length - 1) {
          newPlayerIndex = 0;
        }

        team.playerIndex = newPlayerIndex;
      }

      // player is actor up
      if (currentGame.turns[currentGame.turns.length - 1].player === username) {
        currentGame.turns[currentGame.turns.length - 1].player =
          team.teamPlayers[team.playerIndex];
      }

      return team;
    });
  }

  if (party.host === username) {
    const newHostIndex = Math.floor(Math.random() * party.players.length);
    party.host = party.players[newHostIndex];
  }

  return party.save();
};

export default {
  getParty,
  createParty,
  joinParty,
  updateSettings,
  leaveParty,
};
