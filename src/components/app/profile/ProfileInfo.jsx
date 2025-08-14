import React from "react";
import { EditIcon, Pro9 } from "../../../assets/export";
import ChatAndNotiBtn from "../../global/ChatAndNotiBtn";
import { BiEditAlt } from "react-icons/bi";
import { phoneFormater } from "../../../lib/helpers";

const ProfileInfo = ({ setEditModal, userProfileData }) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center gap-4 relative">
          <div className="relative w-20 h-20">
            {userProfileData?.profilePicture ? (
              <img
                src={Pro9}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex justify-center items-center gap-2 rounded-full bg-[#00AAAD] h-20 w-20 cursor-pointer">
                <span className="text-[18px] font-[600] text-white">
                  {userProfileData?.name?.charAt(0)}
                </span>
              </div>
            )}

            <div
              onClick={() => setEditModal(true)}
              className="absolute bottom-0 right-0 bg-gradient-to-b from-[#10C0B6] to-[#684D7B] w-[35px] h-[35px] flex items-center justify-center rounded-full border cursor-pointer"
            >
              <BiEditAlt color="white" size={20} />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-[22px] font-[600] text-gray-800">
              {userProfileData?.name}
            </h2>
            <p className="text-[#565656] font-[400] text-[14px]">
              {userProfileData?.email}
            </p>
          </div>
        </div>
        <ChatAndNotiBtn />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 border-b-2 pb-6 ">
        <div className="border-r">
          <p className="text-[#565656] font-[500] text-[14px]">Full Name</p>
          <p className="font-[500] text-[#000000] text-[18px] ">
            {userProfileData?.name}
          </p>
        </div>
        <div className="border-r">
          <p className="text-[#565656] font-[500] text-[14px]">Email Address</p>
          <p className="font-[500] text-[#000000] text-[18px] ">
            {userProfileData?.email}
          </p>
        </div>
        <div>
          <p className="text-[#565656] font-[500] text-[14px]">Phone Number</p>
          <p className="font-[500] text-[#000000] text-[18px] ">
            {userProfileData?.phone
              ? `+1 ${phoneFormater(userProfileData?.phone)}`
              : "Not Found"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
