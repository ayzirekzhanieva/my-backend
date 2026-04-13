const express = require('express');
const supabase = require('../lib/supabase');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('transaction_date', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Не удалось получить транзакции' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, amount, type, category, transaction_date } = req.body;

    if (!title || !amount || !type || !category || !transaction_date) {
      return res.status(400).json({
        error: 'title, amount, type, category, transaction_date обязательны'
      });
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          title,
          amount,
          type,
          category,
          transaction_date
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Не удалось создать транзакцию' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ message: 'Транзакция удалена' });
  } catch (err) {
    return res.status(500).json({ error: 'Не удалось удалить транзакцию' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .neq('id', 0);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ message: 'История транзакций очищена' });
  } catch (err) {
    return res.status(500).json({ error: 'Не удалось очистить историю' });
  }
});

module.exports = router;