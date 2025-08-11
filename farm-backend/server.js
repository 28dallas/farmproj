const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;


const dbPath = path.join(__dirname, 'db.json');


app.use(cors());
app.use(bodyParser.json());




// Initialize database with users
const initDB = () => {
  if (!fs.existsSync(dbPath)) {
    // Pre-hash passwords for demo users
    const users = [
      {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync('adminpass', 8),
        role: 'admin'
      },
      {
        id: 2,
        username: 'user1',
        password: bcrypt.hashSync('user1pass', 8),
        role: 'user'
      },
      {
        id: 3,
        username: 'user2',
        password: bcrypt.hashSync('user2pass', 8),
        role: 'user'
      }
    ];
    const initialData = {
      income: [],
      expenses: [],
      projects: [],
      revenueByCrop: [],
      users
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  }
};
// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const data = readDB();
  const user = data.users && data.users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  // For demo, return user info (never return password)
  res.json({ id: user.id, username: user.username, role: user.role });
});

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



// Monthly financials endpoint
app.get('/api/monthly-financials', (req, res) => {
  const data = readDB();
  res.json(data.monthlyFinancials);
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
