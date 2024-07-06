const mongoose = require("mongoose");

async function conntectDB(url) {
  return mongoose.connect(url);
}

module.exports = conntectDB;
