import React, { useContext, useRef, useState } from "react";
import { Mail, Phone } from "../../../assets/export";
import GlobalButton from "../../global/GlobalButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import CountDown from "../../global/CountDown";
import axios from "../../../axios";
import { phoneFormater } from "../../../lib/helpers";
const VerifyPhone = ({
  isOpen,
  onClose,
  handleClick,
  phone,
  email,
  setVirtualListModal,
}) => {
  if (!isOpen) return null;
  const { Auth, userData } = useContext(AppContext);
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(30);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
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
  const getOtpValue = () => {
    return parseInt(otp.join(""), 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isOtpFilled = otp.every((digit) => digit !== "");

    if (!isOtpFilled) {
      ErrorToast("Please enter all OTP digits");
      return;
    }

    setLoading(true);
    try {
      let obj = {
        email: userData?.email,
        phone: true,
        otp: getOtpValue(),
      };

      const response = await axios.post("/auth/verify-reset-otp", obj);

      if (response.status === 200) {
        SuccessToast("Phone Otp Verified Successfully");
        Auth(response?.data);
        setVirtualListModal(true);
        onClose();
      }
    } catch (err) {
      setOtp(Array(4).fill(""));
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleRestart = () => {
    setSeconds(30);
    setIsActive(true);
  };
  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = { email: userData?.email };

      const response = await axios.post("/auth/request-email-otp", obj);

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        setResendLoading(false);
        setOtp(Array(4).fill(""));
        handleRestart();
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] w-[471px] p-6 rounded-3xl shadow-lg relative text-gray-800 flex flex-col">
        {/* <div
          className="bg-white w-[48px] h-[48px] flex justify-center items-center rounded-[14px] cursor-pointer mb-6"
          onClick={onClose}
        >
          <IoIosArrowRoundBack size={24} />
        </div> */}

        <div className="flex flex-col items-center justify-center text-center ">
          <div className="bg-[#00AAAD80] flex justify-center items-center w-[107px] h-[107px] rounded-full">
            <img src={Phone} className="h-[62px] w-[62px]" alt="Mail Icon" />
          </div>

          <h2 className="text-[19px] font-[600] capitalize mt-3">
            Verify One-time password/code on number
          </h2>
          <p className="text-[13px] font-[400] text-[#565656] mt-2">
            One-time password/code code sent to your +1 {phoneFormater(phone)}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-10 mb-2 justify-center mt-4">
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
            <div className="flex items-center justify-center gap-2  mt-4 mb-3 relative z-10">
              <p className="text-sm flex gap-2 text-[#565656]">
                Didn’t receive code?{" "}
                {isActive ? (
                  <CountDown
                    isActive={isActive}
                    setIsActive={setIsActive}
                    seconds={seconds}
                    setSeconds={setSeconds}
                  />
                ) : (
                  <span
                    type="button"
                    disabled={resendLoading}
                    onClick={handleResendOtp}
                    className="text-[#181818] font-medium pl-1 cursor-pointer"
                  >
                    {resendLoading ? "Resending..." : "Resend"}
                  </span>
                )}
              </p>
            </div>
            <div className="w-full pt-2">
              <GlobalButton
                loading={loading}
                children={"Verify"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
