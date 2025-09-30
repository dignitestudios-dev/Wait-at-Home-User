import React from "react";
import { Alert, Clock } from "../../../assets/export";

const CancelEnrollment = ({ isOpen, handleClick, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-60">
      <div className="bg-gradient-to-br flex flex-col justify-center items-center from-[#A0E6E1] to-[#C3B4D3] w-[471px]  p-8 rounded-3xl shadow-lg relative text-gray-800 ">
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="bg-[#00AAAD80] flex justify-center items-center w-[107px] h-[107px] rounded-full">
            <img src={Alert} className="h-[62px] w-[62px]" alt="Success Tick" />
          </div>

          <h2 className="text-[24px] font-[600]">Remove me from the list</h2>

          <p className="text-[16px] font-[400] text-[#565656] max-w-[350px]">
            Are you sure you want to cancel your enrollment
          </p>
          <div className="flex gap-4 ">
            <button
              onClick={handleClick}
              className={`w-[203px] bg-[#FFFFFFBF]  text-[#00908b] text-[14px] font-[600] py-3 rounded-[12px] transition duration-200 `}
            >
              Remove me from the list
            </button>
            <button
              onClick={onClose}
              className={`w-[203px] bg-[#00AAAD] hover:bg-[#00908b] text-white text-[14px] font-[600] py-3 rounded-[12px] transition duration-200 `}
            >
              Keep it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelEnrollment;
