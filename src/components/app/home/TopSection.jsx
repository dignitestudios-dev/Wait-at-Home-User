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
        <h2 className=" text-xl  font-semibold text-[#684D7B]">
          Welcome to Wait at Home™ — the virtual waiting experience designed for pets and their families. <br />
          Reserve your place in line without sitting in a busy lobby. <br /> We will send real-time text and email updates so you know when to arrive with your pet.

        </h2>
      </div>
      {userData?.isUserRegistered && <ChatAndNotiBtn />}
    </div>
  );
};

export default TopSection;
