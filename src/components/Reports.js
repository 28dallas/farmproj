import React, { useState, useEffect } from 'react';
import FinancialSummaryReport from './FinancialSummaryReport';
import BalanceSheetReport from './BalanceSheetReport';
import IncomeStatementReport from './IncomeStatementReport';
import CashFlowReport from './CashFlowReport';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Reports = () => {
  const [activeReport, setActiveReport] = useState('');
  const [revenueByCrop, setRevenueByCrop] = useState([]);
  const [profitMargin, setProfitMargin] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.warn('No authentication token found');
      return;
    }
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Fetch revenue by crop
    fetch(`${API_URL}/api/revenue-by-crop`, { headers })
      .then(res => res.ok ? res.json() : [])
      .then(data => setRevenueByCrop(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching revenue by crop:', err);
        setRevenueByCrop([]);
      });
    
    // Fetch summary
    fetch(`${API_URL}/api/summary`, { headers })
      .then(res => res.ok ? res.json() : {})
      .then(data => {
        if (data.totalRevenue !== undefined && data.totalExpenses !== undefined) {
          const margin = data.totalRevenue === 0 ? 0 : ((data.totalRevenue - data.totalExpenses) / data.totalRevenue) * 100;
          setProfitMargin(margin);
        }
      })
      .catch(err => console.error('Error fetching summary:', err));
    
    // Fetch income and expenses
    Promise.all([
      fetch(`${API_URL}/api/income`, { headers }).then(res => res.ok ? res.json() : []),
      fetch(`${API_URL}/api/expenses`, { headers }).then(res => res.ok ? res.json() : [])
    ])
      .then(([income, expenses]) => {
        const incomeArray = Array.isArray(income) ? income : [];
        const expensesArray = Array.isArray(expenses) ? expenses : [];
        setTransactions([
          ...incomeArray.map(i => ({ ...i, type: 'Income' })),
          ...expensesArray.map(e => ({ ...e, type: 'Expense' }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)));
      })
      .catch(err => {
        console.error('Error fetching transactions:', err);
        setTransactions([]);
      });
    
    // Fetch projects
    fetch(`${API_URL}/api/projects`, { headers })
      .then(res => res.ok ? res.json() : [])
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching projects:', err);
        setProjects([]);
      });
  }, []);

  // Download helpers (CSV export for demo)
  const downloadCSV = (data, filename) => {
    const csvRows = [];
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    for (const row of data) {
      csvRows.push(headers.map(h => JSON.stringify(row[h] ?? '')).join(','));
    }
    const csv = csvRows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setActiveReport('summary')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Financial Summary</button>
        <button onClick={() => setActiveReport('balance')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Balance Sheet</button>
        <button onClick={() => setActiveReport('income')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Income Statement</button>
        <button onClick={() => setActiveReport('cashflow')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Cash Flow</button>
      </div>

      {/* Report Sections */}
      {activeReport === 'summary' && (
        <FinancialSummaryReport />
      )}
      {activeReport === 'balance' && (
        <BalanceSheetReport profitMargin={profitMargin} transactions={transactions} />
      )}
      {activeReport === 'income' && (
        <IncomeStatementReport transactions={transactions} />
      )}
      {activeReport === 'cashflow' && (
        <CashFlowReport transactions={transactions} />
      )}
    </div>
  );
};

export default Reports;
