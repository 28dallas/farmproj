import React, { useState, useEffect } from 'react';
import CashFlow from './CashFlow';
import FinancialSummaryReport from './FinancialSummaryReport';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Reports = () => {
  const [activeReport, setActiveReport] = useState('');
  const [revenueByCrop, setRevenueByCrop] = useState([]);
  const [profitMargin, setProfitMargin] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/revenue-by-crop`)
      .then(res => res.json())
      .then(data => setRevenueByCrop(data));
    fetch(`${API_URL}/api/summary`)
      .then(res => res.json())
      .then(data => {
        if (data.totalRevenue !== undefined && data.totalExpenses !== undefined) {
          const margin = data.totalRevenue === 0 ? 0 : ((data.totalRevenue - data.totalExpenses) / data.totalRevenue) * 100;
          setProfitMargin(margin);
        }
      });
    fetch(`${API_URL}/api/income`)
      .then(res => res.json())
      .then(income => {
        fetch(`${API_URL}/api/expenses`)
          .then(res => res.json())
          .then(expenses => {
            setTransactions([
              ...income.map(i => ({ ...i, type: 'Income' })),
              ...expenses.map(e => ({ ...e, type: 'Expense' }))
            ].sort((a, b) => new Date(b.date) - new Date(a.date)));
          });
      });
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data));
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
        <div>
          <h3 className="text-lg font-semibold mb-2">Balance Sheet</h3>
          {/* Example: show profit margin and revenue/expenses */}
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <p className="text-3xl font-bold text-blue-600">Profit Margin: {profitMargin !== null ? profitMargin.toFixed(2) + '%' : 'N/A'}</p>
          </div>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => downloadCSV(transactions, 'balance_sheet.csv')}>Download CSV</button>
        </div>
      )}
      {activeReport === 'income' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Income Statement</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left">Date</th>
                  <th className="px-2 py-1 text-left">Type</th>
                  <th className="px-2 py-1 text-left">Amount</th>
                  <th className="px-2 py-1 text-left">Source/Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.filter(t => t.type === 'Income').map((t, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-1">{t.date}</td>
                    <td className="px-2 py-1">{t.type}</td>
                    <td className="px-2 py-1">KShs {t.amount?.toLocaleString()}</td>
                    <td className="px-2 py-1">{t.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => downloadCSV(transactions.filter(t => t.type === 'Income'), 'income_statement.csv')}>Download CSV</button>
        </div>
      )}
      {activeReport === 'cashflow' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Cash Flow</h3>
          <CashFlow />
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => downloadCSV(transactions, 'cash_flow.csv')}>Download CSV</button>
        </div>
      )}
    </div>
  );
};

export default Reports;
