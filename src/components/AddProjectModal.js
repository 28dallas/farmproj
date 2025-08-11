import React, { useState } from 'react';

const AddProjectModal = () => {
  const [show, setShow] = useState(false);
  // Add more state for project fields as needed

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setShow(true)}
      >
        Add Project
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
            <h3 className="text-lg font-semibold mb-4">Add Project</h3>
            <form className="flex flex-col gap-4">
              {/* Add project fields here */}
              <input className="border rounded px-3 py-2" placeholder="Project Name" />
              <input className="border rounded px-3 py-2" placeholder="Crop" />
              <input className="border rounded px-3 py-2" placeholder="Acreage" />
              {/* ... */}
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;
