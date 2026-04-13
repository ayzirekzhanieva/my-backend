require('dotenv').config();

const express = require('express');
const cors = require('cors');

const transactionsRouter = require('./routes/transactions');
const aiRouter = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Finance AI Backend is running' });
});

app.use('/api/transactions', transactionsRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});