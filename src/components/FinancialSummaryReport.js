import React, { useState } from 'react';

const mockData = {
  totalRevenue: 12345.67,
  totalExpenses: 6789.01,
  expensesBreakdown: [
    { category: 'Labor', amount: 2500 },
    { category: 'Supplies', amount: 1800 },
    { category: 'Utilities', amount: 1200 },
    { category: 'Transport', amount: 900 },
    { category: 'Other', amount: 389.01 },
  ],
};

function formatCurrency(amount) {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const FinancialSummaryReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 800);
  };

  const totalRevenue = data?.totalRevenue || 0;
  const totalExpenses = data?.totalExpenses || 0;
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue ? (netProfit / totalRevenue) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Financial Summary Report</h2>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <button
          className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded mt-4 md:mt-6"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Financial Summary'}
        </button>
      </div>

      {data && (
        <div className="space-y-8">
          {/* Top Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-green-900 text-white">
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-100">
                  <td className="px-4 py-2">Total Revenue</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalRevenue)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2">Total Expenses</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(totalExpenses)}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-100">
                  <td className="px-4 py-2 font-semibold">Net Profit</td>
                  <td className="px-4 py-2 text-right font-semibold">{formatCurrency(netProfit)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2">Profit Margin (%)</td>
                  <td className="px-4 py-2 text-right">{profitMargin.toFixed(2)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expenses Breakdown Table */}
          <div className="overflow-x-auto">
            <h3 className="text-lg font-bold mb-2">Expenses Breakdown</h3>
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-green-900 text-white">
                  <th className="px-4 py-2 text-left">Expense Category</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-right">% of Total Expenses</th>
                </tr>
              </thead>
              <tbody>
                {data.expensesBreakdown.map((item, idx) => (
                  <tr key={item.category} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-100' : 'bg-gray-50'}>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-2 text-right">{((item.amount / totalExpenses) * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialSummaryReport;
