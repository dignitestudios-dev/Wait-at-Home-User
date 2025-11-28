import React, { useContext } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import ChatAndNotiBtn from "../../global/ChatAndNotiBtn";
import { AppContext } from "../../../context/AppContext";
import { LogoWhite } from "../../../assets/export";

const TopSection = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4   rounded-xl">
      <div className="flex items-center gap-3 ">
        {/* <img src={LogoWhite} className="w-[40px]" alt="" /> */}
        <h2 className=" font-medium text-white mb-2">
          Welcome to Wait at Home <sup>(TM)</sup> – the virtual waiting list for
          pets and vets! Secure your place in line to see a doctor but do your
          waiting at home instead of in the lobby. You will receive real-time
          updates via email and/or text so you will know when to arrive at the
          clinic with your pet.
        </h2>
      </div>
      {userData?.isUserRegistered && <ChatAndNotiBtn />}
    </div>
  );
};

export default TopSection;
