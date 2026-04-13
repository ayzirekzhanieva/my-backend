function categorizeTransaction(title) {
  const text = title.toLowerCase();

  if (
    text.includes('burger') ||
    text.includes('pizza') ||
    text.includes('shawarma') ||
    text.includes('cafe') ||
    text.includes('coffee') ||
    text.includes('бургер') ||
    text.includes('кофе') ||
    text.includes('донер') ||
    text.includes('пицца') ||
    text.includes('кафе')
  ) {
    return 'Еда';
  }

  if (
    text.includes('taxi') ||
    text.includes('bus') ||
    text.includes('metro') ||
    text.includes('fuel') ||
    text.includes('такси') ||
    text.includes('бензин') ||
    text.includes('автобус') ||
    text.includes('метро')
  ) {
    return 'Транспорт';
  }

  if (
    text.includes('netflix') ||
    text.includes('spotify') ||
    text.includes('steam') ||
    text.includes('game') ||
    text.includes('игра') ||
    text.includes('кино')
  ) {
    return 'Развлечения';
  }

  if (
    text.includes('book') ||
    text.includes('course') ||
    text.includes('school') ||
    text.includes('university') ||
    text.includes('книга') ||
    text.includes('курс') ||
    text.includes('школа') ||
    text.includes('университет')
  ) {
    return 'Образование';
  }

  return 'Другое';
}

module.exports = { categorizeTransaction };