import React, { useState } from "react";
import NotificationToogle from "../../global/NotificationToogle";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import ReminderOption from "./ReminderOption";
import ChatAndNotiBtn from "../../global/ChatAndNotiBtn";
import { useNavigate } from "react-router";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
const SettingMainContent = ({ userProfileData, setUpdate }) => {
  const navigate = useNavigate();
  const [notificationsToggle, setNotificationsToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const newValue = !notificationsToggle;
      setNotificationsToggle(newValue);

      const response = await axios.post("/user/notification-settings", {
        isEnabled: newValue,
      });

      if (response?.status === 200) {
        SuccessToast(response?.data?.message);
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
      <div className="lg:col-span-8 space-y-8">
        {/* <div className="flex flex-col md:flex-row md:justify-between border-b-2 pb-3">
          <div>
            <h2 className="text-[16px] font-[600] capitalize">Notifications</h2>
            <p className="text-[13px] text-[#4E4E4E]">
              Lorem ipsum dolor sit amet consectetur. Ipsum aliquam est nam urna
              odio lectus a.
            </p>
          </div>
          <NotificationToogle />
        </div> */}

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
          <NotificationToogle
            userProfileData={userProfileData}
            loader={loading}
            notificationsToggle={notificationsToggle}
            setNotificationsToggle={handleToggle}
          />
        </div>

        <div className="border-b-2 pb-3">
          <div>
            <h2 className="text-[16px] font-[600] ">
              Notifications{" "}
              <span className="text-gray-500 font-[500] ">
                (Select all that apply)
              </span>{" "}
            </h2>
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
            <h2 className="text-[16px] cursor-pointer font-[600] capitalize">
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
            <h2 className="text-[16px] cursor-pointer font-[600] capitalize">
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
