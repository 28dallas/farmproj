import React, { useState } from 'react';

const IncomeStatementReport = ({ transactions }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [show, setShow] = useState(false);

  const handleGenerate = () => {
    setShow(true);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
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
        >
          Generate Income Statement
        </button>
      </div>
      {show && (
        <div className="overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Income Statement</h3>
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
      )}
    </div>
  );
};

export default IncomeStatementReport;
