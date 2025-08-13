import React, { useState } from "react";
import { Bgauth, Tick } from "../../../assets/export";

const DeleteSuccess = () => {
  return (
    <div
      className="min-h-screen rounded-[45px] bg-cover bg-center w-full
    flex items-center justify-center lg:justify-end px-4 p-10"
      style={{ backgroundImage: `url(${Bgauth})` }}
    >
      <div
        className="bg-white  backdrop-blur-sm shadow-2xl rounded-[45px]
      w-full max-w-[599px] h-[772px] p-6 lg:p-20
      mx-auto lg:mx-0
      flex flex-col justify-center"
      >
        <div className="flex justify-center items-center">
          <div className="w-[90px] h-[90px] bg-[#00AAAD] rounded-full flex items-center justify-center mb-6">
            <img src={Tick} alt="tick" className="w-[56.5px] h-[56.5px]" />
          </div>
        </div>

        <div className="text-center mb-6 mt-5">
          <h2 className="text-[26px] sm:text-[28px] lg:text-[32px] font-[600] text-[#1F1F1F]">
            Deleted Successfully
          </h2>
          <p className="text-[#565656] text-[13px] font-[400] mt-1">
            Your account has been deactivated successfully, You can recover it
            within 7 days else it will be deleted permanently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteSuccess;
