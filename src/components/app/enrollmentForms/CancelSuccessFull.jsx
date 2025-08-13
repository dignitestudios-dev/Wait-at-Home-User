import React from "react";
import { Alert, Clock, Tick } from "../../../assets/export";

const CancelSuccessFull = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-60">
      <div
        onClick={onClose}
        className="bg-gradient-to-br cursor-pointer flex flex-col justify-center items-center from-[#A0E6E1] to-[#C3B4D3] w-[471px]  p-8 rounded-3xl shadow-lg relative text-gray-800 "
      >
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="bg-[#00AAAD80] flex justify-center items-center w-[107px] h-[107px] rounded-full">
            <img src={Tick} className="h-[62px] w-[62px]" alt="Success Tick" />
          </div>
          <h2 className="text-[24px] font-[600]">Cancelled Successfully</h2>
          <p className="text-[16px] font-[400] text-[#565656] max-w-[350px]">
            Your enrollment has been cancelled successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelSuccessFull;
