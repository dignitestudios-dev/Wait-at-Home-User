import React from "react";
import NotificationToogle from "../../global/NotificationToogle";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import ReminderOption from "./ReminderOption";
import ChatAndNotiBtn from "../../global/ChatAndNotiBtn";
import { useNavigate } from "react-router";

const SettingMainContent = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
      <div className="lg:col-span-8 space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between border-b-2 pb-3">
          <div>
            <h2 className="text-[16px] font-[600] capitalize">Notifications</h2>
            <p className="text-[13px] text-[#4E4E4E]">
              Lorem ipsum dolor sit amet consectetur. Ipsum aliquam est nam urna
              odio lectus a.
            </p>
          </div>
          <NotificationToogle />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between border-b-2 pb-3">
          <div>
            <h2 className="text-[16px] font-[600] capitalize">
              Receive updates/newsletters from Palmer and Riley
            </h2>
            <p className="text-[13px] text-[#4E4E4E]">
              Lorem ipsum dolor sit amet consectetur. Ipsum aliquam est nam urna
              odio lectus a.
            </p>
          </div>
          <NotificationToogle />
        </div>

        <div className="border-b-2 pb-3">
          <div>
            <h2 className="text-[16px] font-[600] capitalize">Reminders</h2>
            <p className="text-[13px] text-[#4E4E4E]">
              Lorem ipsum dolor sit amet consectetur. Ipsum aliquam est nam urna
              odio lectus a.
            </p>
          </div>
          <ReminderOption label="Number" />
          <ReminderOption label="Email" />
        </div>

        <div
          className="flex justify-between border-b-2 pb-3"
          onClick={() => navigate("/app/change-password")}
        >
          <div>
            <h2 className="text-[16px] font-[600] capitalize">
              Change password
            </h2>
            <p className="text-[13px] text-[#4E4E4E]">
              Lorem ipsum dolor sit amet consectetur. Ipsum aliquam est nam urna
              odio lectus a.
            </p>
          </div>
          <IoIosArrowForward size={24} />
        </div>

        <div
          onClick={() => navigate("/app/delete-account")}
          className="flex justify-between border-b-2 pb-3"
        >
          <div>
            <h2 className="text-[16px] font-[600] capitalize">
              Delete Account
            </h2>
            <p className="text-[13px] text-[#4E4E4E]">
              Lorem ipsum dolor sit amet consectetur. Ipsum aliquam est nam urna
              odio lectus a.
            </p>
          </div>
          <IoIosArrowForward size={24} />
        </div>
      </div>
      <ChatAndNotiBtn />
    </div>
  );
};

export default SettingMainContent;
