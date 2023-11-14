import { faCheck, faCross, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ToastComp = ({ message, success }) => {
  const textColor = success ? 'text-green-600' : 'text-red-600'; 
  const borderColor = success ? 'border-green-500' : 'border-red-500'; 
  const icon = success ? faCheck : faX;
  

  return (
    <>
      <div className=" z-50 fixed start-1/2 top-7 transform -translate-x-1/2">
        <div
          id="toast-simple"
          className={`flex items-center w-full rounded-md max-w-xs px-4 py-3 border-1 ${borderColor} space-x-4 text-gray-500 bg-white divide-x divide-gray-300 shadow space-x`}
          role="alert"
        >
          <div className={` ${textColor}`}>
          <FontAwesomeIcon fixedWidth icon={icon} />
          </div>
          <div className={`pl-4 text-sm font-normal ${textColor}`}>
            {message}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToastComp;
