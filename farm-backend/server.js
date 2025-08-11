const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const multer = require('multer');
// In-memory login activity log (for demo)
let loginActivity = [];

const app = express();
const PORT = 5000;
const upload = multer({ dest: 'uploads/' });
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());


// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { username, password, email, displayName } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const data = readDB();
  if (data.users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }
  const newUser = {
    id: Date.now(),
    username,
    password: bcrypt.hashSync(password, 8),
    role: 'user',
    email: email || '',
    displayName: displayName || username
  };
  data.users.push(newUser);
  writeDB(data);
  res.json({ id: newUser.id, username: newUser.username, role: newUser.role });
});

// 2FA setup endpoint
app.post('/api/2fa/setup', (req, res) => {
  const { username } = req.body;
  const data = readDB();
  const user = data.users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const secret = speakeasy.generateSecret({ name: `FarmApp (${username})` });
  user.twoFASecret = secret.base32;
  writeDB(data);
  qrcode.toDataURL(secret.otpauth_url, (err, imageUrl) => {
    if (err) return res.status(500).json({ message: 'QR code error' });
    res.json({ otpauth_url: secret.otpauth_url, qr: imageUrl, secret: secret.base32 });
  });
});

// 2FA verify endpoint
app.post('/api/2fa/verify', (req, res) => {
  const { username, token } = req.body;
  const data = readDB();
  const user = data.users.find(u => u.username === username);
  if (!user || !user.twoFASecret) return res.status(400).json({ message: '2FA not setup' });
  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: 'base32',
    token
  });
  res.json({ verified });
});

// Log login activity
function logLogin(username, status) {
  loginActivity.push({ username, status, time: new Date().toISOString() });
  if (loginActivity.length > 100) loginActivity.shift();
}

// Export db.json
app.get('/api/export', (req, res) => {
  res.download(dbPath, 'db.json');
});

// Import db.json
app.post('/api/import', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });
  fs.copyFileSync(file.path, dbPath);
  fs.unlinkSync(file.path);
  res.json({ message: 'Data imported successfully' });
});

// Reset db.json
app.post('/api/reset', (req, res) => {
  const initialData = {
    income: [],
    expenses: [],
    projects: [],
    revenueByCrop: [],
    users: [
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
    ]
  };
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  res.json({ message: 'Data reset successfully' });
});




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
    logLogin(username, 'fail');
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    logLogin(username, 'fail');
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  logLogin(username, 'success');
  // For demo, return user info (never return password)
  res.json({ id: user.id, username: user.username, role: user.role, twoFA: !!user.twoFASecret });
});

// Get login activity
app.get('/api/login-activity', (req, res) => {
  res.json(loginActivity.slice().reverse());
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
