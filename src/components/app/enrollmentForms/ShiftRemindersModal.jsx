import React, { useState } from "react";
import { Message, Mobile } from "../../../assets/export";
import GlobalButton from "../../global/GlobalButton";
import { IoIosArrowRoundBack } from "react-icons/io";

const ShiftRemindersModal = ({
  isOpen,
  handleClick,
  selectedOptions,
  setSelectedOptions,
}) => {
  if (!isOpen) return null;
  console.log(selectedOptions, "selectedOptions==");
  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const isSelected = (option) => selectedOptions.includes(option);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br  from-[#A0E6E1] to-[#C3B4D3] w-[471px] h-[472px] p-8 rounded-3xl shadow-lg relative text-gray-800">
        <div className="flex flex-col items-center justify-center text-center space-y-5">
          <h2 className="text-[24px] font-[600]">
            How Would You Like to Receive Shift Reminders?
          </h2>

          <div className="flex gap-4">
            <div
              onClick={() => toggleOption("email")}
              className={`cursor-pointer border border-white space-y-2 flex flex-col items-center justify-center h-[134px] w-[127px] rounded-[20px] ${
                isSelected("email") ? " bg-white" : "bg-[#FFFFFF26]"
              }`}
            >
              <img src={Message} className="h-[40.5px] w-[45px]" alt="Email" />
              <p className="text-[14px] font-[500]">Email</p>
            </div>

            <div
              onClick={() => toggleOption("phone")}
              className={`cursor-pointer   border border-white space-y-2 flex flex-col items-center justify-center h-[134px] w-[127px] rounded-[20px] ${
                isSelected("phone") ? "bg-white" : "bg-[#FFFFFF26]"
              }`}
            >
              <img src={Mobile} className="h-[46px] w-[34px]" alt="Phone" />
              <p className="text-[14px] font-[500]">Phone</p>
            </div>
          </div>

          <p className="text-[16px] font-[400] text-[#565656] max-w-[350px]">
            Stay on top of your schedule! Choose your preferred way to receive
            shift reminders—via email or phone number, so you never miss an
            update.
          </p>
        </div>

        <div className="w-full mt-10">
          <GlobalButton children={"Continue"} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default ShiftRemindersModal;
