import React, { useContext } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import ChatAndNotiBtn from "../../global/ChatAndNotiBtn";
import { AppContext } from "../../../context/AppContext";

const TopSection = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4  p-4 rounded-xl">
      <div className="flex-1">
        <h2 className="text-[24px] font-[600] text-white mb-2">Wait At Home</h2>
        <div className="flex items-start gap-2 text-white text-[14px] font-[400] leading-relaxed">
          <IoAlertCircleOutline size={24} className="mt-1 min-w-[24px]" />
          <p>
            Welcome to Wait at Home (TM) – the virtual waiting list for pets and
            vets! Secure your place in line to see a doctor but do your waiting
            at home instead of in the lobby. You will receive real-time updates
            via email and/or text so you will know when to arrive at the clinic
            with your pet.
          </p>
        </div>
      </div>
      {userData?.isUserRegistered && <ChatAndNotiBtn />}
    </div>
  );
};

export default TopSection;
