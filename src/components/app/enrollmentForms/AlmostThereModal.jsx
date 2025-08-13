import React from "react";
import { Tick } from "../../../assets/export";
import GlobalButton from "../../global/GlobalButton";
import { IoIosArrowRoundBack } from "react-icons/io";

const AlmostThereModal = ({ isOpen, onClose, handleClick, email, phone }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] w-[471px] p-6 rounded-3xl shadow-lg relative text-gray-800 flex flex-col">
        <div className="bg-white w-[48px] h-[48px] flex justify-center items-center rounded-[14px] cursor-pointer mb-6">
          <IoIosArrowRoundBack size={24} />
        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="bg-[#00AAAD80] flex justify-center items-center w-[107px] h-[107px] rounded-full">
            <img src={Tick} className="h-[62px] w-[62px]" alt="Success Tick" />
          </div>

          <h2 className="text-[24px] font-[600]">You're Almost There!</h2>

          <p className="text-[16px] font-[400] text-[#565656] max-w-[350px]">
            You are all clear to enroll in the virtual waiting list! Before
            proceeding, please verify both your email and phone number to secure
            your spot.
          </p>

          <p className="text-[14px] font-[500]">
            Note: The 6-digit OTP has been sent to your
          </p>

          <p className="text-[14px] font-[500] text-[#565656]">
            Email: <span className="text-black font-[500]">{email}</span>{" "}
            &nbsp;&nbsp;|&nbsp;&nbsp; Number:
            <span className="text-black font-[500]"> {phone}</span>
          </p>

          <div className="w-full pt-4">
            <GlobalButton children={"Continue"} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlmostThereModal;
