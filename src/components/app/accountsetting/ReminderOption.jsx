import React from "react";
import { FaCheck } from "react-icons/fa";

const ReminderOption = ({ label, checked, onChange, loading }) => {
  return (
    <div>
      <div className="flex items-center gap-2 px-2 text-[14px] text-black">
        <label className="relative cursor-pointer">
          <input
            type="checkbox"
            className="peer hidden"
            checked={checked}
            onChange={onChange}
            disabled={loading} 
          />
          <div className="flex items-center gap-2 mt-3">
            <div
              className={`w-[24px] h-[24px] rounded-[6px] border border-black cursor-pointer flex items-center justify-center ${
                checked ? "bg-[#5E2E86]" : "bg-white"
              }`}
            >
              {loading ? (
                <div className="w-[24px] h-[24px] rounded-[6px] border-2 border-gray-400 bg-gray-400 border-t-transparent  animate-pulse"></div>
              ) : (
                checked && <FaCheck size={14} color="#fff" />
              )}
            </div>
            <span className="cursor-pointer">{label}</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ReminderOption;
