const getWeekNumber = (date) => {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstJan.getDay() + 1) / 7);
};

exports.isDesignatedDay = (batch, date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun, 1 Mon ...
  const week = getWeekNumber(d);
  const isOddWeek = week % 2 === 1;

  if (batch === "BATCH_1") {
    if (isOddWeek) return day >= 1 && day <= 3; // Mon-Wed
    else return day === 4 || day === 5; // Thu-Fri
  }

  if (batch === "BATCH_2") {
    if (isOddWeek) return day === 4 || day === 5;
    else return day >= 1 && day <= 3;
  }

  return false;
};