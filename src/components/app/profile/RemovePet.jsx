import React from "react";
import { Bgauth, Tick } from "../../../assets/export";
import { FiTrash } from "react-icons/fi";
import { RiLoader5Line } from "react-icons/ri";

const RemovePet = ({ isOpen, onClose, handleCLick, deleteLoading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
      
        className="bg-gradient-to-br h-[338px] cursor-pointer flex items-center justify-center     flex-col  from-[#A0E6E1] to-[#C3B4D3] w-[471px]   p-8 rounded-3xl shadow-lg relative text-gray-800 "
      >
        <div className="flex justify-center items-center">
          <div className="w-[90px] h-[90px] bg-[#00AAAD] rounded-full flex items-center justify-center mb-6">
            <FiTrash size={50} color="white" />
          </div>
        </div>
        <h2 className="text-[24px] font-[600] text-[#212121] text-center ">
          Remove Pet Profile?
        </h2>
        <p className="text-[16px] font-[400] text-[#565656] text-center ">
          Are you sure you want to Remove your pet Profile?
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleCLick}
            className={`w-[203px] bg-white  text-[#00AAAD] text-[14px] font-[600] py-3 rounded-[12px] transition duration-200 `}
          >
            <div className="flex justify-center items-center">
              <span className="mr-1"> Delete now</span>
              {deleteLoading && (
                <RiLoader5Line className="animate-spin text-lg " />
              )}
            </div>
          </button>
          <button
            onClick={onClose}
            className={`w-[203px] bg-[#00AAAD]  text-white text-[14px] font-[600] py-3 rounded-[12px] transition duration-200 `}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemovePet;
