const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const seatRoutes = require("./src/routes/seatRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

app.use(cors({
  origin: "https://seating-arrangement-tlkw.onrender.com/",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
