require("dotenv").config();
const mongoose = require("mongoose");
const Seat = require("./src/models/Seat");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const seats = [];

  for (let i = 1; i <= 50; i++) {
    seats.push({
      seatNumber: i,
      type: i > 40 ? "FLOATER" : "DESIGNATED"
    });
  }

  await Seat.insertMany(seats);
  console.log("Seed complete");
  process.exit();
});