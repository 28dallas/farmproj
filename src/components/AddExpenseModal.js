import React, { useState } from 'react';

const AddExpenseModal = ({ categories, setCategories, uoms, setUoms }) => {
  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newUom, setNewUom] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUom, setSelectedUom] = useState('');

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => setShow(true)}
      >
        Add Expense
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
            <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
            <form className="flex flex-wrap gap-4 items-end">
              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Add Category"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => {
                      if (newCategory && !categories.includes(newCategory)) {
                        setCategories([...categories, newCategory]);
                        setSelectedCategory(newCategory);
                        setNewCategory('');
                      }
                    }}
                  >Add</button>
                </div>
              </div>
              {/* UoM Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1">UoM</label>
                <div className="flex gap-2">
                  <select
                    value={selectedUom}
                    onChange={e => setSelectedUom(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">Select UoM</option>
                    {uoms.map((u, idx) => (
                      <option key={idx} value={u}>{u}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Add UoM"
                    value={newUom}
                    onChange={e => setNewUom(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => {
                      if (newUom && !uoms.includes(newUom)) {
                        setUoms([...uoms, newUom]);
                        setSelectedUom(newUom);
                        setNewUom('');
                      }
                    }}
                  >Add</button>
                </div>
              </div>
              {/* Other form fields can go here */}
            </form>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={() => setShow(false)}
                type="button"
              >Cancel</button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                type="submit"
                onClick={e => { e.preventDefault(); setShow(false); }}
              >Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddExpenseModal;
