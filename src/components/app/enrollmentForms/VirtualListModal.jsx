import React from "react";
import { Clock, Tick } from "../../../assets/export";
import GlobalButton from "../../global/GlobalButton";
import { IoIosArrowRoundBack } from "react-icons/io";

const VirtualListModal = ({ isOpen, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
        onClick={handleClick}
        className="bg-gradient-to-br flex flex-col justify-center items-center from-[#A0E6E1] to-[#C3B4D3] w-[471px] h-[415px] p-6 rounded-3xl shadow-lg relative text-gray-800 "
      >
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="bg-[#00AAAD80] flex justify-center items-center w-[107px] h-[107px] rounded-full">
            <img src={Clock} className="h-[62px] w-[62px]" alt="Success Tick" />
          </div>

          <h2 className="text-[24px] font-[600]">
            You’re in the Virtual Waiting List!
          </h2>

          <p className="text-[16px] font-[400] text-[#565656] max-w-[350px]">
            You’ve been added to the Virtual Waiting List. Please wait at home
            and keep an eye on the list progress.
          </p>

          <p className="text-[14px] font-[500]">
            Note: We’ll notify you when your turn is near—stay ready!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VirtualListModal;
