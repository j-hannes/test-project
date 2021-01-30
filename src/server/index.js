const express = require("express");
const { calculateGame } = require("./game.api");
const { world } = require("./world");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { path = "" } = req.query;
  const pathArray = path.split(",");
  const { status } = calculateGame(world, pathArray);
  console.log("status", status);
  res.json({ result: status });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
