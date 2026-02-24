const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["EMPLOYEE", "ADMIN"], default: "EMPLOYEE" },
  squad: { type: Number },
  batch: { type: String, enum: ["BATCH_1", "BATCH_2"] },
  designatedSeat: { type: Number }
});

module.exports = mongoose.model("User", userSchema);