import React from 'react';

const Modal = ({ isOpen, message, onClose,onConfirm,confirmText }) => {
  return (
  <>
      <div
        id="popup-modal"
        className={`fixed top-1/4 left-1/3 z-50 ${
          isOpen ? "" : "hidden"
        } p-4 overflow-x-hidden w-2/5 overflow-y-auto h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg border-2 border-gray-400 shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-800  hover:text-gray-500 active:text-gray-800 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-red-500 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-semibold text-gray-800">
                {message}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-800 bg-gray-50 hover:bg-gray-200 hover:text-black focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border-2 border-gray-300 text-sm font-semibold px-5 py-2.5"
                onClick={onClose}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
