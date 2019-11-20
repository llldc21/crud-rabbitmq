const mongoose = require("mongoose");

mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://mongodb:27017/crudDB", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

module.exports = db;
