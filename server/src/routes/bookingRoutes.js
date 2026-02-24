const router = require("express").Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");
const { bookSeat } = require("../controllers/bookingController");

router.post("/", auth, bookSeat);
router.get("/:date", auth, async (req, res) => {
  const bookings = await Booking.find({
    date: new Date(req.params.date)
  });
  res.json(bookings);
});
router.post("/leave", auth, async (req, res) => {
  const Leave = require("../models/Leave");

  const leave = await Leave.create({
    user: req.user.id,
    date: new Date(req.body.date)
  });

  res.json(leave);
});
module.exports = router;