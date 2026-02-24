const router = require("express").Router();
const Seat = require("../models/Seat");

router.post("/generate-seats", async (req, res) => {
  await Seat.deleteMany();

  for (let i = 1; i <= 50; i++) {
    await Seat.create({
      seatNumber: i,
      type: i <= 40 ? "DESIGNATED" : "FLOATER"
    });
  }

  res.json({ message: "Seats generated" });
});

module.exports = router;