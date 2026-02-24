const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const User = require("../models/User");
const Leave = require("../models/Leave");
const {
    isWeekend,
    isHoliday,
    isAfter3PM,
    isNextWorkingDay
} = require("../services/ValidationService");

const { isDesignatedDay } = require("../services/attendanceService");

exports.bookSeat = async (req, res) => {
    const { date } = req.body;
    const user = await User.findById(req.user.id);

    if (isWeekend(date))
        return res.status(400).json({ message: "Weekend not allowed" });

    if (await isHoliday(date))
        return res.status(400).json({ message: "Holiday not allowed" });

    const designated = isDesignatedDay(user.batch, new Date(date));


    // Check if user has marked leave
    const leaveRecord = await Leave.findOne({
        user: user._id,
        date: new Date(date)
    });

    if (designated && !leaveRecord) {
        return res.status(400).json({
            message: "You are already designated for this day. No booking needed."
        });
    }

    if (!isAfter3PM() || !isNextWorkingDay(date)) {
        return res.status(400).json({
            message: "Can only book tomorrow after 3 PM"
        });
    }

    const existing = await Booking.findOne({
        user: user._id,
        date: new Date(date)
    });

    if (existing)
        return res.status(400).json({ message: "Already booked" });

    // Check for released designated seats
    const leaves = await Leave.find({ date: new Date(date) });

    let availableSeat = null;

    for (const leave of leaves) {
        const leaveUser = await User.findById(leave.user);
        if (isDesignatedDay(leaveUser.batch, date)) {
            availableSeat = leaveUser.designatedSeat;
            break;
        }
    }

    // If no released seat, allocate floater
    if (!availableSeat) {
        const floaterCount = await Booking.countDocuments({
            date: new Date(date),
            seatNumber: { $gte: 41 }
        });

        if (floaterCount >= 10)
            return res.status(400).json({ message: "No floater seats left" });

        availableSeat = 41 + floaterCount;
    }

    const booking = await Booking.create({
        user: user._id,
        seatNumber: availableSeat,
        date
    });

    res.json(booking);
};