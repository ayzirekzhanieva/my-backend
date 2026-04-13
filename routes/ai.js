const express = require('express');
const supabase = require('../lib/supabase');
const { predictDaysLeft } = require('../lib/predict');
const { getPetState } = require('../lib/petState');
const { buildFutureProjection } = require('../lib/futureProjection');

const router = express.Router();

function formatCategoryName(category) {
  const map = {
    Food: 'Еда',
    Transport: 'Транспорт',
    Entertainment: 'Развлечения',
    Education: 'Образование',
    Other: 'Другое',
    'Еда': 'Еда',
    'Транспорт': 'Транспорт',
    'Развлечения': 'Развлечения',
    'Образование': 'Образование',
    'Другое': 'Другое'
  };

  return map[category] || category || 'Другое';
}

router.get('/advice', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const expenses = data.filter((item) => item.type === 'expense');
    const income = data.filter((item) => item.type === 'income');

    const totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
    const balance = totalIncome - totalExpense;

    const categoryTotals = {};
    for (const item of expenses) {
      const categoryName = formatCategoryName(item.category);
      categoryTotals[categoryName] =
        (categoryTotals[categoryName] || 0) + Number(item.amount);
    }

    const daysLeft = predictDaysLeft(balance, totalExpense);

    let topCategory = 'Другое';
    let topAmount = 0;

    for (const category in categoryTotals) {
      if (categoryTotals[category] > topAmount) {
        topAmount = categoryTotals[category];
        topCategory = category;
      }
    }

    let summary = '';

    if (totalIncome === 0 && totalExpense === 0) {
      summary =
        'Пока у вас нет добавленных транзакций. Добавьте доходы и расходы, и ассистент покажет анализ, подскажет слабые места в тратах и поможет лучше управлять бюджетом.';
    } else {
      summary += `Сейчас ваш баланс составляет ${balance}. `;

      if (totalExpense > 0) {
        summary += `Всего расходов: ${totalExpense}. `;
      }

      if (totalIncome > 0) {
        summary += `Всего доходов: ${totalIncome}. `;
      }

      if (topAmount > 0) {
        summary += `Больше всего денег уходит на категорию "${topCategory}" — ${topAmount}. `;
      }

      if (daysLeft !== null) {
        if (daysLeft <= 3) {
          summary += `⚠️ Важно: если продолжить тратить в таком темпе, денег может хватить только примерно на ${daysLeft} дн. `;
        } else if (daysLeft <= 7) {
          summary += `⚠️ Обратите внимание: при текущем темпе расходов баланс может закончиться примерно через ${daysLeft} дн. `;
        } else {
          summary += `По текущему темпу расходов денег может хватить примерно на ${daysLeft} дн. `;
        }
      }

      if (topCategory === 'Еда') {
        summary += 'Попробуйте сократить траты на фастфуд и кофе — обычно именно там проще всего быстро сэкономить.';
      } else if (topCategory === 'Развлечения') {
        summary += 'Есть шанс неплохо сэкономить, если немного сократить спонтанные траты на развлечения и подписки.';
      } else if (topCategory === 'Транспорт') {
        summary += 'Проверьте, можно ли уменьшить транспортные расходы: например, объединять поездки или выбирать более выгодные варианты.';
      } else if (topCategory === 'Образование') {
        summary += 'Траты на обучение могут быть полезными, но всё равно стоит заранее планировать их в бюджете.';
      } else {
        summary += 'Старайтесь записывать каждую покупку и откладывать хотя бы небольшую сумму каждую неделю.';
      }
    }

    const pet = getPetState({
      totalIncome,
      totalExpense,
      balance,
      daysLeft
    });

    const future = buildFutureProjection(totalIncome, totalExpense, balance);

    return res.json({
      summary,
      stats: {
        totalIncome,
        totalExpense,
        balance,
        categoryTotals,
        daysLeft,
        pet,
        future
      }
    });
  } catch (err) {
    console.error('AI advice error:', err);
    return res.status(500).json({ error: 'Не удалось сформировать AI-анализ' });
  }
});

module.exports = router;