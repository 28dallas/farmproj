import React, { useState } from 'react';

const AddCropModal = ({ onAddCrop }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    growingSeason: '',
    avgYieldAcre: '',
    marketPriceUnit: '',
    avgCostAcre: '',
    avgIncomeAcre: '',
    avgReturns: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCrop({ ...formData, id: Date.now() });
    setFormData({
      name: '',
      type: '',
      growingSeason: '',
      avgYieldAcre: '',
      marketPriceUnit: '',
      avgCostAcre: '',
      avgIncomeAcre: '',
      avgReturns: ''
    });
    setShow(false);
  };

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setShow(true)}
      >
        Add Crop
      </button>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShow(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">Add Crop</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Crop Name"
                required
              />
              <input
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Type"
                required
              />
              <input
                name="growingSeason"
                value={formData.growingSeason}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Growing Season"
              />
              <input
                name="avgYieldAcre"
                value={formData.avgYieldAcre}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Avg Yield/Acre"
                type="number"
              />
              <input
                name="marketPriceUnit"
                value={formData.marketPriceUnit}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Market Price/Unit"
                type="number"
              />
              <input
                name="avgCostAcre"
                value={formData.avgCostAcre}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Avg Cost/Acre"
                type="number"
              />
              <input
                name="avgIncomeAcre"
                value={formData.avgIncomeAcre}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Avg Income/Acre"
                type="number"
              />
              <input
                name="avgReturns"
                value={formData.avgReturns}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Avg Returns"
                type="number"
              />
              <div className="flex justify-end mt-6">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
                  onClick={() => setShow(false)}
                  type="button"
                >Cancel</button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  type="submit"
                >Save Crop</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCropModal;
