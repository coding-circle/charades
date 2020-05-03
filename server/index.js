const express = require("express");
const app = express();
const port = 4001;

app.get("/", (req, res) => res.send("everyone is good enough"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
