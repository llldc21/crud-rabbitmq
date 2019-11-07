const mongoose = require("mongoose");

mongoose.connect("mongodb://mongodb:27017/crudDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

module.exports = db;
