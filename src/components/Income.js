import React, { useState, useEffect } from 'react';
import AddIncomeModal from './AddIncomeModal';

const Income = () => {
  const [income, setIncome] = useState([]);
  const [localIncome, setLocalIncome] = useState([]);

  const handleAddIncome = (newIncome) => {
    setLocalIncome(prev => [...prev, newIncome]);
  };

  const allIncome = [...income, ...localIncome];

  useEffect(() => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  fetch(`${API_URL}/api/income`)
      .then(res => res.json())
      .then(data => setIncome(data));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex gap-2 mb-4">
        <AddIncomeModal onAddIncome={handleAddIncome} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="px-2 py-1 text-left">Date</th>
              <th className="px-2 py-1 text-left">Project</th>
              <th className="px-2 py-1 text-left">Crop</th>
              <th className="px-2 py-1 text-left">Yield</th>
              <th className="px-2 py-1 text-left">Price/Unit</th>
              <th className="px-2 py-1 text-left">Other Income</th>
              <th className="px-2 py-1 text-left">Total Income</th>
              <th className="px-2 py-1 text-left">Description</th>
              <th className="px-2 py-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allIncome.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-4">No income records found</td>
              </tr>
            )}
            {allIncome.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-2 py-1">{item.date}</td>
                <td className="px-2 py-1">{item.project}</td>
                <td className="px-2 py-1">{item.crop}</td>
                <td className="px-2 py-1">{item.yield}</td>
                <td className="px-2 py-1">{item.priceUnit}</td>
                <td className="px-2 py-1">{item.otherIncome}</td>
                <td className="px-2 py-1">{item.totalIncome}</td>
                <td className="px-2 py-1">{item.description}</td>
                <td className="px-2 py-1">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Income;
