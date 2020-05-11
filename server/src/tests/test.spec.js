/**
 * @file test.spec.js
 *
 * This file is used to execute jest tests synchronously.
 * By default it runs asynchronously, which could cause issues with db changes.
 */
const { makePartyTests } = require("./makeParty.js");

describe("Make Party", makePartyTests);
