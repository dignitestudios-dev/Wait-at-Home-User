import React from "react";
import { PurpleTick } from "../../../assets/export";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { LiaCheckDoubleSolid } from "react-icons/lia";

const RequestSubmited = ({ handleClick, chartStart }) => {
  return (
    <div>
      <div className=" h-[92px] w-[439px] bg-white p-3 mx-11 flex gap-4 items-center rounded-b-[20px] rounded-tr-[20px]">
        <img src={PurpleTick} className="w-[45px] h-[45px] " alt="" />
        <h2 className="text-[#5E2E86] font-[600] text-[16px] ">
          Response submitted
        </h2>
      </div>
      <div className="bg-[#FFFFFF80] p-3 rounded-[12px] w-[695px] mx-auto mt-3">
        <h2 className="text-[14px] text-center ">
          Thank you! Our team is reviewing your case. If urgent, a
          representative will assist you shortly. Please hold...
        </h2>
      </div>
      <div
        // onClick={handleClick}
        className="bg-[#FFFFFF59] cursor-pointer text-[14px] font-[500] w-[178px] h-[48px] flex items-center justify-center  gap-2 mx-auto mt-4 rounded-[32px] "
      >
        {chartStart ? <LiaCheckDoubleSolid /> : <RxCounterClockwiseClock />}
        {chartStart ? "Chat Started" : "Please Wait"}
      </div>
    </div>
  );
};

export default RequestSubmited;
