import React from "react";

const NotificationToogle = ({
  loader,
  onClick,
  setNotificationsToggle,
  notificationsToggle,
  userProfileData,
}) => {
  console.log(userProfileData?.user?.notificationEnabled, "userProfileData");
  return (
    <div>
      <label
        className="relative mb-[25px] inline-flex items-center cursor-pointer"
        onClick={onClick}
      >
        {loader && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 rounded-full z-10">
            <div className="w-6 h-6 border-blue-900 rounded-full animate-pulse"></div>
          </div>
        )}

        <input
          type="checkbox"
          className="sr-only peer"
          checked={notificationsToggle}
          onChange={onClick}
          disabled={loader}
        />

        <div
          className={`w-11 h-6 bg-[#94b8c0]  rounded-full    
                          ${
                            userProfileData?.user?.notificationEnabled
                              ? "peer-checked:bg-gradient-to-l to-[#63CFAC] from-[#29ABE2]"
                              : "peer-checked:bg-[#7698a1]"
                          } 
                          peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
                          after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
        ></div>
      </label>
    </div>
  );
};

export default NotificationToogle;
