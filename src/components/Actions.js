import React from 'react';

const Actions = () => {
  return (
    <div className="flex space-x-3 mb-6">
      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        Add Project
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        Record Income
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        Record Expense
      </button>
    </div>
  );
};

export default Actions;