import React, { useState, useEffect } from 'react';
import AddCropModal from './AddCropModal';

const Crops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  fetch(`${API_URL}/api/crops`)
      .then(res => res.json())
      .then(data => setCrops(data));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex gap-2 mb-4">
        <AddCropModal />
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Add Crop Type</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Growing Season</th>
              <th className="px-2 py-1 text-left">Avg Yield/Acre</th>
              <th className="px-2 py-1 text-left">Market Price/Unit</th>
              <th className="px-2 py-1 text-left">Avg Cost/Acre</th>
              <th className="px-2 py-1 text-left">Avg Income/Acre</th>
              <th className="px-2 py-1 text-left">Avg Returns</th>
              <th className="px-2 py-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-4">No crops found</td>
              </tr>
            )}
            {crops.map((crop, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-2 py-1">{crop.name}</td>
                <td className="px-2 py-1">{crop.type}</td>
                <td className="px-2 py-1">{crop.growingSeason}</td>
                <td className="px-2 py-1">{crop.avgYieldAcre}</td>
                <td className="px-2 py-1">{crop.marketPriceUnit}</td>
                <td className="px-2 py-1">{crop.avgCostAcre}</td>
                <td className="px-2 py-1">{crop.avgIncomeAcre}</td>
                <td className="px-2 py-1">{crop.avgReturns}</td>
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

export default Crops;
