import React from 'react';

const SummaryCards = () => {
  const cards = [
    { title: 'Total Revenue', value: '$0.00', color: 'text-green-600' },
    { title: 'Total Expenses', value: '$0.00', color: 'text-red-600' },
    { title: 'Net Profit', value: '$0.00', color: 'text-blue-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{card.title}</h3>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;