import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";

const GlobalInputs = ({
  placeholder,
  value,
  onChange,
  type = "text",
  onBlur,
  name,
  id,
  error,
  touched,
  max,
  disabled = false,
  label,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full relative">
      {label && (
        <label className="block mb-1 text-sm font-medium text-[#333]">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={isPassVisible ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          maxLength={max}
          id={id}
          disabled={disabled}
          className={`w-full rounded-xl pr-11 px-4 py-3 h-[49px] mb-1 text-[14px] font-[400] bg-white placeholder:text-[#616161] outline-none border transition
            ${
              error && touched
                ? "border-red-500 ring-1 ring-red-500"
                : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
            }
            ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}
          `}
        />
        {isPassword && (
          <span
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#18181852] text-lg cursor-pointer"
          >
            {!isPassVisible ? <BsEyeSlash /> : <AiOutlineEye />}
          </span>
        )}
      </div>

      {error && touched && (
        <p className="text-red-500 text-[12px] mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};

export default GlobalInputs;
