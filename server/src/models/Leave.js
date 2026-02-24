const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date
});

module.exports = mongoose.model("Leave", leaveSchema);