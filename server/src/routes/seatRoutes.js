const router = require("express").Router();
const Seat = require("../models/Seat");

router.get("/", async (req, res) => {
  const seats = await Seat.find();
  res.json(seats);
});

module.exports = router;