function getPetState({ totalIncome, totalExpense, balance, daysLeft }) {
  let health = 100;
  let level = 1;
  let avatar = '😎';
  let title = 'Отличная форма';
  let message = 'Я доволен: твой бюджет под контролем и всё выглядит уверенно.';
  let state = 'happy';

  if (balance < 0) {
    health = 25;
    level = 1;
    avatar = '😵';
    title = 'Критическая ситуация';
    message =
      'Я переживаю: расходы превысили доходы. Пора сократить траты и восстановить баланс.';
    state = 'danger';
  } else if (daysLeft !== null && daysLeft <= 3) {
    health = 40;
    level = 2;
    avatar = '😬';
    title = 'Рискованный период';
    message =
      'Я предупреждаю: при текущем темпе расходов денег осталось совсем ненадолго.';
    state = 'warning';
  } else if (balance < totalIncome * 0.2) {
    health = 60;
    level = 3;
    avatar = '🙂';
    title = 'Нужна осторожность';
    message =
      'Я советую быть внимательнее: финансовая подушка сейчас небольшая.';
    state = 'caution';
  } else if (balance >= totalIncome * 0.5) {
    health = 95;
    level = 5;
    avatar = '😎';
    title = 'Отличная форма';
    message =
      'Я доволен: твои финансы выглядят стабильно, ты отлично контролируешь бюджет.';
    state = 'excellent';
  } else {
    health = 80;
    level = 4;
    avatar = '😊';
    title = 'Хорошая динамика';
    message =
      'Я вижу хороший прогресс: твои расходы под контролем и ситуация стабильна.';
    state = 'good';
  }

  return {
    health,
    level,
    avatar,
    title,
    message,
    state
  };
}

module.exports = { getPetState };