function getBudgetLimits() {
  return {
    'Еда': 100,
    'Транспорт': 80,
    'Развлечения': 120,
    'Образование': 200,
    'Другое': 100
  };
}

function calculateBudgetStatus(categoryTotals) {
  const limits = getBudgetLimits();
  const alerts = [];

  for (const category in categoryTotals) {
    const spent = categoryTotals[category];
    const limit = limits[category];

    if (!limit) continue;

    if (spent > limit) {
      const exceededBy = spent - limit;
      const percent = Math.round((spent / limit) * 100);

      alerts.push({
        category,
        spent,
        limit,
        exceededBy,
        percent,
        status: 'exceeded',
        message: `Вы превысили лимит по категории "${category}" на ${exceededBy} сом`
      });
    } else if (spent >= limit * 0.8) {
      const percent = Math.round((spent / limit) * 100);

      alerts.push({
        category,
        spent,
        limit,
        exceededBy: 0,
        percent,
        status: 'warning',
        message: `Вы почти достигли лимита по категории "${category}" — использовано ${percent}%`
      });
    }
  }

  return {
    limits,
    alerts
  };
}

module.exports = { getBudgetLimits, calculateBudgetStatus };