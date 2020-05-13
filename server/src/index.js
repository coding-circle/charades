import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import SocketService from "./services/socket.js";
import DbService from "./services/db.js";
import AppManager from "./AppManager.js";
import router from "./routes/api.js";
import bodyParser from "body-parser";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// initializations
const app = express();
const server = http.createServer(app);

const db = new DbService(process.env.MONGO_URI);
const socket = new SocketService(server);
const manager = new AppManager(socket, db);

// middleware
// TODO: break out into separate file, add more middleware:
//  - add `{ body: {} }` to post that don't have a body
//  - at some point we'll want some security middleware
app.use(cors());
app.use(bodyParser());

// routes
// TODO: create separate routes and controllers files
app.get("/", (req, res) => res.send("everyone is good enough"));

app.use("/api/", router);

// listen
const port = process.env.PORT || 4001;

server.listen(port, () => {
  console.log(`Charades server listening on port ${port}`);
});
