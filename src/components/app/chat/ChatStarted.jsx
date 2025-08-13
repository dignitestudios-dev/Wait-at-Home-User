import React from "react";
import { AdminImg } from "../../../assets/export";
import { FaPaperPlane } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const ChatStarted = () => {
  return (
    <div>
      <div className="flex justify-end">
        <div className="bg-[#00b1b1] text-white px-4 py-2 rounded-xl text-sm max-w-xs">
          Lorem ipsum dolor sit amet consectetur. Accumsan fermentum gravida
          facilisi sapien nec.. Elementum vehicula sodales sed purus fusce..
        </div>
      </div>

      <div className="flex items-start gap-2">
        <div className="border border-[#5E2E86] rounded-full p-[1px]">
          <div className="w-8 h-8 rounded-full bg-[#5E2E86] border flex items-center justify-center">
            <img src={AdminImg} className="w-[22px] h-[22px]" alt="admin" />
          </div>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl text-sm max-w-md shadow text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Habitasse suspendisse lacus
          pulvinar elit laoreet.. Turpis aliquam viverra penatibus donec. Ut
          massa vitae faucibus curabitur. Viverra amet non at mauris ullamcorper
          luctus cras turpis..
        </div>
      </div>
      <div className="bg-white rounded-[16px] mt-4 h-[90px] border-t px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type Message"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none"
        />
        <button className="bg-[#00b1b1] p-2 rounded-full text-white">
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatStarted;
