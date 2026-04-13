function predictDaysLeft(balance, totalExpense, daysInMonth = 30) {
  if (totalExpense <= 0) return null;

  const averageDailyExpense = totalExpense / daysInMonth;

  if (averageDailyExpense <= 0) return null;

  return Math.floor(balance / averageDailyExpense);
}

module.exports = { predictDaysLeft };