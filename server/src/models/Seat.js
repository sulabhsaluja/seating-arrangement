const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: Number,
  type: { type: String, enum: ["DESIGNATED", "FLOATER"] },
  assignedTo: Number
});

module.exports = mongoose.model("Seat", seatSchema);