const express = require("express");

const mongodb = require("./config/database/mongodb");

mongodb.on("error", error => {
  console.log(`Error on connect to MongoDB: ${JSON.stringify(error)}`);
});

const app = express();

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(4000);
