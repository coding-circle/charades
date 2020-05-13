/**
 * @file test.spec.js
 *
 * This file is used to execute jest tests synchronously.
 * By default it runs asynchronously, which could cause issues with db changes.
 */
import { makePartyTests } from "./makeParty";
import { joinPartyTests } from "./joinParty";
import { createGameTests } from "./createGame";

describe("Make Party", makePartyTests);
describe("Join Party", joinPartyTests);
describe("Create Game", createGameTests);
