import http from "http";
import express from "express";
import socketIo from "socket.io";

import SocketService from "./services/socket.js";
import AppManager from "./AppManager.js";

// TODO: load from env
const PORT = 4001;

/* MARK: initializations */
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const socket = new SocketService(io)
const manager = new AppManager(socket);

/* MARK: middleware */
// TODO: break out into separate file, add more middleware:
//  - add `{ body: {} }` to post that don't have a body
//  - at some point we'll want sone security middleware

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // TODO: better cors handling
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

/* MARK: routes */
// TODO: create separate routes and controllers files
app.get("/", (req, res) => res.send("everyone is good enough"));

app.post("/parties", (req, res) => {
  const { hostName = "player1", settings = {} } = req.body || {};
  const initialState = manager.createParty(hostName, settings);
  res.status(200).send(initialState);
});

app.post("/parties/players", (req, res) => {
  const { playerName = "newplayer", partyId = "0000" } = req.body || {};
  const newState = manager.addPlayerToParty(playerName, partyId);
  res.status(200).send(newState);
});

/* MARK: listen */
server.listen(PORT, () => {
  console.log(`Charades server listening on port ${PORT}`);
});
