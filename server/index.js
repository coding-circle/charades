const express = require("express");
const app = express();
const port = 4001;

const { GameModel } = require("./model.js");

app.get("/", (req, res) => res.send("everyone is good enough"));

app.get("/games", (req, res) => {
  GameModel.find().then((result) => {
    res.send(result);
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
