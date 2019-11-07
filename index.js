const express = require("express");
const logger = require("./config/logger/winston");
const moment = require("moment-timezone");

const mongodb = require("./config/database/mongodb");

mongodb.on("error", error => {
  console.log(`Error on connect to MongoDB: ${JSON.stringify(error)}`);
});

const app = express();

app.get("/", (req, res) => {
  logger.error("olá");

  res.send("Ok");
});

app.listen(4000, function() {
  let currentDate = moment
    .tz("America/Sao_Paulo")
    .format("YYYY-MM-DD HH:mm:ss");
  logger.info(`*** Server started at: ${currentDate} ***`);
});
