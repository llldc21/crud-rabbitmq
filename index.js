const express = require("express");
const logger = require("./config/logger/winston");
const moment = require("moment-timezone");
const routes = require("./routes");
const bodyParser = require("body-parser");

const mongodb = require("./config/database/mongodb");

mongodb.on("error", error => {
  logger.error(`Error on connect to MongoDB: ${JSON.stringify(error)}`);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(4000, function() {
  let currentDate = moment
    .tz("America/Sao_Paulo")
    .format("YYYY-MM-DD HH:mm:ss");
  logger.info(`*** Server started at: ${currentDate} ***`);
});

module.exports = app;
