const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  date: Date,
  name: String
});

module.exports = mongoose.model("Holiday", holidaySchema);