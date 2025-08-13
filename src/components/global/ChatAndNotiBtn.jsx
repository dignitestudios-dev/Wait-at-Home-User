import React from "react";
import { useNavigate } from "react-router";

const ChatAndNotiBtn = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="lg:col-span-4">
        <div className="flex items-center justify-center gap-4 p-3 rounded-[20px] border border-white bg-[#b5d8dc] min-w-[227px] h-[56px] w-full max-w-sm mx-auto lg:mx-0">
          <button
            className="text-[16px] font-[600]"
            onClick={() => navigate("/app/chat")}
          >
            Chat
          </button>
          <div className="bg-[#00AAAD] h-5 w-[2px]" />
          <button
            className="text-[16px] font-[600]"
            onClick={() => navigate("/app/notifications")}
          >
            Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAndNotiBtn;
