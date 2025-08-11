import React, { useState } from 'react';

const BalanceSheetReport = ({ profitMargin, transactions }) => {
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
          Generate Balance Sheet
        </button>
      </div>
      {show && (
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h3 className="text-lg font-semibold mb-2">Balance Sheet</h3>
          <p className="text-3xl font-bold text-blue-600">Profit Margin: {profitMargin !== null ? profitMargin.toFixed(2) + '%' : 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default BalanceSheetReport;
