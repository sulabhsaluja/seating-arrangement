const Holiday = require("../models/Holiday");

exports.isWeekend = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
};

exports.isAfter3PM = () => {
  const now = new Date();
  return now.getHours() >= 12;
};

exports.isNextWorkingDay = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return new Date(date).toDateString() === tomorrow.toDateString();
};

exports.isHoliday = async (date) => {
  const holiday = await Holiday.findOne({ date });
  return !!holiday;
};