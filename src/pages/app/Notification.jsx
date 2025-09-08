import React, { useContext } from "react";
import { RxClock } from "react-icons/rx";
import ChatAndNotiBtn from "../../components/global/ChatAndNotiBtn";
import { useGlobal } from "../../hooks/api/Get";
import { ClockHistory } from "../../assets/export";
import { AppContext } from "../../context/AppContext";

const Notification = () => {
  const { notificationUpdate } = useContext(AppContext);
  const { loading, data: notifications } = useGlobal(
    "/user/get-push-notification-history",
    1,
    notificationUpdate
  );

  return (
    <div className="h-screen">
      <div className="flex justify-end mb-5">
        <ChatAndNotiBtn />
      </div>

      <div className="space-y-4 py-6 custom-scrollbar overflow-y-auto max-h-[90vh] px-4 ">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#b5d8dc] p-4 rounded-b-[20px] rounded-tr-[20px] animate-pulse"
              >
                <div className="flex gap-4 sm:gap-6 md:gap-10 items-start sm:items-center">
                  <div className="bg-[#5E2E86]/40 w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="h-3 bg-gray-300 rounded w-16 ml-auto mt-3"></div>
              </div>
            ))
          : notifications
              ?.slice() // copy array taake original mutate na ho
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              ?.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#b5d8dc] p-4 rounded-b-[20px] rounded-tr-[20px]"
                >
                  <div className="flex gap-4 sm:gap-6 md:gap-10 items-start sm:items-center">
                    <div className="bg-[#5E2E86] w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-full flex items-center justify-center">
                      <img
                        src={ClockHistory}
                        className="h-[24px] w-[24px] "
                        alt=""
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-[17px] font-semibold">
                        {item?.title}
                      </h2>
                      <p className="text-sm sm:text-[14px] font-normal text-[#2B2B2B] mt-1">
                        {item?.message}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-[12px] font-medium text-end mt-2">
                    {new Date(item?.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
      </div>
    </div>
  );
};

export default Notification;
