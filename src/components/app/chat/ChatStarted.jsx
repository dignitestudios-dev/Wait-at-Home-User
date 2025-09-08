import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { AdminImg } from "../../../assets/export";
import { sendMessage, subscribeToMessages } from "../../../firebase/messages";
import { formatTime } from "../../../lib/helpers";

const ChatStarted = ({ roomId, userId, setMessages, messages }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = subscribeToMessages(roomId, (msgs) => {
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(roomId, input, userId);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="flex-1 space-y-4  p x-2 pb-10">
        {messages.map((msg) => {
          const isCurrentUser = msg.senderId === userId;
          return (
            <div
              key={msg.id}
              className={`flex ${
                isCurrentUser ? "justify-end" : "items-start gap-2"
              }`}
            >
              
              {!isCurrentUser && (
                <div className="border border-[#5E2E86] rounded-full p-[1px]">
                  <div className="w-8 h-8 rounded-full bg-[#5E2E86] flex items-center justify-center">
                    <img
                      src={AdminImg}
                      className="w-[22px] h-[22px]"
                      alt="admin"
                    />
                  </div>
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`px-4 py-2 break-words rounded-xl text-sm max-w-xs shadow ${
                  isCurrentUser
                    ? "bg-[#00b1b1] text-white"
                    : "bg-[#FFFFFF80] text-[#000000]"
                }`}
              >
                {msg.content}
                <div
                  className={`text-[11px]  mt-1 text-end ${
                    isCurrentUser ? "text-white" : "text-gray-400"
                  } `}
                >
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="bg-white absolute bottom-0 right-0 left-0 rounded-br-[16px] rounded-bl-[16px] mt-4 h-[90px] border-t px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-[#00b1b1] p-2 rounded-full text-white"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatStarted;
