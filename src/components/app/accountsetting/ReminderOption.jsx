import React from "react";

const ReminderOption = ({ label, checked, onChange, loading }) => {
  return (
    <div className="flex items-center justify-between px-2 py-1 text-[14px] text-black">
      <span>{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          disabled={loading}
        />
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-300 ${
            checked ? "bg-[#5E2E86]" : "bg-gray-300"
          } peer-checked:bg-[#5E2E86] ${
            loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div
            className={`absolute left-0 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              checked ? "translate-x-6" : "translate-x-0"
            } ${loading ? "animate-pulse bg-gray-400" : ""}`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ReminderOption;
