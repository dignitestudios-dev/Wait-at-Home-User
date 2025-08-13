import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const ProfileSidebar = ({
  setActiveTab,
  activeTab,
  userData,
  handleLogOut,
}) => {
  return (
    <div>
      <div className="w-[80px] border md:w-[289px] min-h-screen rounded-[30px] bg-gradient-to-b from-[#10C0B6] to-[#684D7B] p-4 flex flex-col justify-between text-white">
        <div>
          {userData?.isUserRegistered ? (
            <>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-2 h-[48px] w-full px-3 rounded-[16px] mb-4 font-[600] text-left text-[16px] md:text-base transition-all ${
                  activeTab === "profile"
                    ? "bg-white text-[#5E2E86]"
                    : "bg-transparent text-white hover:bg-white/20"
                }`}
              >
                <FaRegUser
                  className={activeTab === "profile" ? "text-[#5E2E86]" : ""}
                />
                <span className="hidden md:inline">My Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("setting")}
                className={`flex items-center gap-2 h-[48px] w-full px-3 rounded-[16px] font-[600] text-left text-[16px] md:text-base transition-all ${
                  activeTab === "setting"
                    ? "bg-white text-[#5E2E86]"
                    : "bg-transparent text-white hover:bg-white/20"
                }`}
              >
                <IoSettingsOutline
                  className={activeTab === "setting" ? "text-[#5E2E86]" : ""}
                />
                <span className="hidden md:inline">Account Setting</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 h-[48px] w-full px-3 rounded-[16px] mb-4 font-[600] text-left text-[16px] md:text-base transition-all ${
                activeTab === "profile"
                  ? "bg-white text-[#5E2E86]"
                  : "bg-transparent text-white hover:bg-white/20"
              }`}
            >
              <FaRegUser
                className={activeTab === "profile" ? "text-[#5E2E86]" : ""}
              />
              <span className="hidden md:inline">My Profile</span>
            </button>
          )}
        </div>
        {userData?.isUserRegistered ? (
          <button
            onClick={() => handleLogOut()}
            className="flex justify-center items-center gap-2 p-2 w-full rounded-[16px] bg-white text-[16px] font-[500] md:text-base"
          >
            <CiLogout className="text-[#EE3131]" />
            <span className="hidden md:inline text-[#EE3131]">Logout</span>
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
