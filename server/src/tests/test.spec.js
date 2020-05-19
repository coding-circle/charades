/**
 * @file test.spec.js
 *
 * This file is used to execute jest tests synchronously.
 * By default it runs asynchronously, which could cause issues with db changes.
 */
import { createPartyTests } from "./createParty";
import { joinPartyTests } from "./joinParty";
import { createGameTests } from "./createGame";
import { addPromptTests } from "./addPrompt";
import { updateSettingsTests } from "./updateSettings";
import { renameTeamTests } from "./renameTeam";

describe("Create Party", createPartyTests);
describe("Join Party", joinPartyTests);
describe("Create Game", createGameTests);
describe("Add Prompt Tests", addPromptTests);
describe("Update Settings Tests", updateSettingsTests);
describe("Rename Team Name", renameTeamTests);
