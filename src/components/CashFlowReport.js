import React, { useState } from 'react';
import CashFlow from './CashFlow';

const CashFlowReport = ({ transactions }) => {
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
          Generate Cash Flow
        </button>
      </div>
      {show && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Cash Flow</h3>
          <CashFlow />
        </div>
      )}
    </div>
  );
};

export default CashFlowReport;
