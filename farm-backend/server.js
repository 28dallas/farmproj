const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Initialize database
const initDB = () => {
  if (!fs.existsSync(dbPath)) {
    const initialData = {
      income: [],
      expenses: [],
      projects: [],
      revenueByCrop: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  }
};

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Income endpoints
app.get('/api/income', (req, res) => {
  const data = readDB();
  res.json(data.income);
});

app.post('/api/income', (req, res) => {
  const data = readDB();
  const newIncome = { id: Date.now(), ...req.body };
  data.income.push(newIncome);
  writeDB(data);
  res.json(newIncome);
});

// Expenses endpoints
app.get('/api/expenses', (req, res) => {
  const data = readDB();
  res.json(data.expenses);
});

app.post('/api/expenses', (req, res) => {
  const data = readDB();
  const newExpense = { id: Date.now(), ...req.body };
  data.expenses.push(newExpense);
  writeDB(data);
  res.json(newExpense);
});

// Projects endpoints
app.get('/api/projects', (req, res) => {
  const data = readDB();
  res.json(data.projects);
});

app.post('/api/projects', (req, res) => {
  const data = readDB();
  const newProject = { id: Date.now(), ...req.body };
  data.projects.push(newProject);
  writeDB(data);
  res.json(newProject);
});

// Revenue by crop endpoint
app.get('/api/revenue-by-crop', (req, res) => {
  const data = readDB();
  res.json(data.revenueByCrop);
});

// Summary endpoint
app.get('/api/summary', (req, res) => {
  const data = readDB();
  const totalRevenue = data.income.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalExpenses = data.expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
  const netProfit = totalRevenue - totalExpenses;

  res.json({
    totalRevenue,
    totalExpenses,
    netProfit
  });
});

initDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});