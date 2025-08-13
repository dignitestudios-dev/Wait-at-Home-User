import React, { useRef, useState } from "react";
import { Mail, Phone } from "../../../assets/export";
import GlobalButton from "../../global/GlobalButton";
import { IoIosArrowRoundBack } from "react-icons/io";

const VerifyPhone = ({ isOpen, onClose, handleClick, phone }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  if (!isOpen) return null;

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] w-[471px] p-6 rounded-3xl shadow-lg relative text-gray-800 flex flex-col">
        <div
          className="bg-white w-[48px] h-[48px] flex justify-center items-center rounded-[14px] cursor-pointer mb-6"
          onClick={onClose}
        >
          <IoIosArrowRoundBack size={24} />
        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-[#00AAAD80] flex justify-center items-center w-[107px] h-[107px] rounded-full">
            <img src={Phone} className="h-[62px] w-[62px]" alt="Mail Icon" />
          </div>

          <h2 className="text-[24px] font-[600] capitalize">
            Verify OTP on number
          </h2>
          <p className="text-[16px] font-[400] text-[#565656]">
            OTP code sent to your {phone}
          </p>

          <div className="flex gap-3 justify-center mt-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[idx] = el)}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-[52px] h-[52px] text-center rounded-xl border border-[#DADADA] text-[20px] font-semibold bg-white outline-none"
              />
            ))}
          </div>

          <p className="text-sm text-[#565656]">
            Didn’t receive code?{" "}
            <span className="font-semibold cursor-pointer underline">
              Resend
            </span>
          </p>

          <div className="w-full pt-2">
            <GlobalButton children={"Verify"} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
