import React, { useState } from 'react';

const AddIncomeModal = ({ onAddIncome }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    project: '',
    crop: '',
    yield: '',
    priceUnit: '',
    otherIncome: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalIncome = (parseFloat(formData.yield || 0) * parseFloat(formData.priceUnit || 0)) + parseFloat(formData.otherIncome || 0);
    onAddIncome({ ...formData, totalIncome, id: Date.now() });
    setFormData({
      date: '',
      project: '',
      crop: '',
      yield: '',
      priceUnit: '',
      otherIncome: '',
      description: ''
    });
    setShow(false);
  };

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setShow(true)}
      >
        Record Income
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
            <h3 className="text-lg font-semibold mb-4">Record Income</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                type="date"
                required
              />
              <input
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Project"
                required
              />
              <input
                name="crop"
                value={formData.crop}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Crop"
                required
              />
              <input
                name="yield"
                value={formData.yield}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Yield"
                type="number"
              />
              <input
                name="priceUnit"
                value={formData.priceUnit}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Price/Unit"
                type="number"
              />
              <input
                name="otherIncome"
                value={formData.otherIncome}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
                placeholder="Other Income"
                type="number"
              />
              <input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-2 border rounded px-3 py-2"
                placeholder="Description"
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
                >Save Income</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddIncomeModal;
