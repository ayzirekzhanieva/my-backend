function calculateMonthlySavings(totalIncome, totalExpense, balance) {
  if (totalIncome <= 0) {
    return 0;
  }

  const estimated = Math.max(0, totalIncome - totalExpense);

  if (estimated > 0) {
    return estimated;
  }

  return Math.max(0, balance * 0.2);
}

function getProjectionStage(amount) {
  if (amount >= 500000) {
    return {
      title: 'Финансовая легенда',
      avatar: '🏍️',
      message: 'Если продолжишь в том же духе, сможешь позволить себе очень крупную цель.'
    };
  }

  if (amount >= 200000) {
    return {
      title: 'Большая цель уже близко',
      avatar: '🚀',
      message: 'Такой темп накоплений уже выглядит как серьезный финансовый рост.'
    };
  }

  if (amount >= 100000) {
    return {
      title: 'Уверенный прогресс',
      avatar: '🏠',
      message: 'Ты уже двигаешься к крупным покупкам и финансовой стабильности.'
    };
  }

  if (amount >= 30000) {
    return {
      title: 'Хороший старт',
      avatar: '🚲',
      message: 'Даже небольшие регулярные накопления дают заметный результат.'
    };
  }

  return {
    title: 'Начало пути',
    avatar: '🌱',
    message: 'Чтобы увидеть сильный рост, важно закрепить привычку откладывать регулярно.'
  };
}

function buildFutureProjection(totalIncome, totalExpense, balance) {
  const monthlySavings = calculateMonthlySavings(totalIncome, totalExpense, balance);

  const yearsList = [1, 3, 5, 10];
  const projections = {};

  yearsList.forEach((years) => {
    const months = years * 12;
    const projectedAmount = monthlySavings * months;
    const stage = getProjectionStage(projectedAmount);

    projections[years] = {
      years,
      months,
      monthlySavings,
      projectedAmount,
      ...stage
    };
  });

  return {
    monthlySavings,
    projections
  };
}

module.exports = { buildFutureProjection };