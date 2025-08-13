import React from "react";
import { RxClock } from "react-icons/rx";
import ChatAndNotiBtn from "../../components/global/ChatAndNotiBtn";

const notifications = [
  {
    id: 1,
    title: "You’re up!",
    message:
      "Lorem ipsum dolor sit amet consectetur. Fringilla nibh etiam ultrices ut id mi eu tortor. Potenti at molestie metus amet aliquet sapien non a.",
    time: "Now",
  },
  {
    id: 2,
    title: "New Task Assigned",
    message:
      "A new task has been added to your project board. Please review the requirements and start working as soon as possible.",
    time: "2 mins ago",
  },
  {
    id: 3,
    title: "Meeting Reminder",
    message:
      "Your team sync is scheduled in 30 minutes. Make sure to prepare the updates.",
    time: "10 mins ago",
  },
];

const Notification = () => {
  return (
    <div className=" h-screen">
      <div className="flex justify-end mb-5">
        <ChatAndNotiBtn />
      </div>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-[#b5d8dc] p-4 rounded-b-[20px] rounded-tr-[20px]"
          >
            <div className="flex gap-4 sm:gap-6 md:gap-10 items-start sm:items-center">
              <div className="bg-[#5E2E86] w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-full flex items-center justify-center">
                <RxClock color="white" size={24} />
              </div>
              <div>
                <h2 className="text-base sm:text-[17px] font-semibold">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-[14px] font-normal text-[#2B2B2B] mt-1">
                  {item.message}
                </p>
              </div>
            </div>
            <p className="text-[11px] sm:text-[12px] font-medium text-end mt-2">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
