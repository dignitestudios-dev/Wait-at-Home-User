import React from "react";
import { Flag, MobileLogo } from "../../../assets/export";

const JoinWaitList = ({
  handleModalOpen,
  handleCancelEnrollment,
  appointmentNumber,
  loading,
}) => {
  return (
    <div className="bg-[#b5d8dc] cursor-pointer flex flex-col justify-center h-[228px] w-[289px] rounded-[30px] border shadow-md p-4">
      {loading ? (
       
        <>
          <div className="flex gap-3 items-center">
            <div className="w-[28px] h-[28px] rounded-full bg-gray-300 animate-pulse" />
            <div className="h-5 w-32 bg-gray-300 rounded-md animate-pulse" />
          </div>
          <div className="h-[85px] w-full mt-2 bg-gray-300 rounded-md animate-pulse" />
          <div className="w-full h-10 mt-4 bg-gray-300 rounded-full animate-pulse" />
        </>
      ) : appointmentNumber?.appointmentNumber ? (
        <>
          <div className="flex gap-3 items-center">
            <img src={Flag} className="w-[28px] h-[28px]" alt="" />
            <h2 className="text-[18px] font-[500]">Your Number</h2>
          </div>
          <h2 className="bg-gradient-to-l text-center to-[#684D7B] from-[#10C0B6] bg-clip-text text-transparent text-[85px] font-[700]">
            {appointmentNumber?.appointmentNumber}
          </h2>
          <button
            className={`w-full bg-[#5E2E86] text-white text-[16px] font-[500] py-3 rounded-full transition duration-200`}
            onClick={handleCancelEnrollment}
          >
            Cancel Enrollment
          </button>
        </>
      ) : (
        <>
          <img
            onClick={handleModalOpen}
            src={MobileLogo}
            alt="Join Waitlist"
            className="w-[100px] mx-auto h-[102.4px] object-contain"
          />
          <h3 className="text-lg font-semibold text-[#333] capitalize mt-4 text-center">
            join the waiting list
          </h3>
        </>
      )}
    </div>
  );
};

export default JoinWaitList;
