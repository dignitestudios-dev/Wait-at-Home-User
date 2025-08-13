import React from "react";
import { RiLoader5Line } from "react-icons/ri";
const GlobalButton = ({
  onClick,
  children,
  type = "button",
  disabled,
  loading,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full ${
        disabled
          ? " bg-gray-400 cursor-not-allowed"
          : "bg-[#00AAAD] hover:bg-[#00908b]"
      }  text-white text-[14px] font-[600] py-3 rounded-full transition duration-200 `}
    >
      <div className="flex justify-center items-center">
        <span className="mr-1">{children}</span>
        {loading && <RiLoader5Line className="animate-spin text-lg " />}
      </div>
    </button>
  );
};

export default GlobalButton;
