import React, { useState, useEffect, useContext } from "react";
import { FaClock } from "react-icons/fa";
import { AppContext } from "../../../context/AppContext";

const EstimatedTime = ({
  update,
  data,
  handleCancelEnrollment,
  appointmentNumber,
}) => {
  const [time, setTime] = useState(0);
  const { appointmentData } = useContext(AppContext);

  useEffect(() => {
    if (data && typeof data.estimatedWaitMinutes === "number") {
      setTime(data.estimatedWaitMinutes * 60);
    } else {
      setTime(0);
    }
  }, [data, appointmentData?.signUpRecord, update]);

  useEffect(() => {
    if (!time) return;
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime <= 0 ? 0 : prevTime - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  const maxTime = data?.estimatedWaitMinutes
    ? data.estimatedWaitMinutes * 60
    : 0;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    maxTime > 0
      ? circumference - (time / maxTime) * circumference
      : circumference;

  return (
    <div
      className="
        bg-[#b5d8dc]
        h-[228px] w-[289px]
        rounded-3xl
        backdrop-blur-sm
        shadow-lg
        flex flex-col justify-between
        p-4
        overflow-hidden
      "
    >
      <h2 className="text-xl text-center font-semibold text-[#684D7B]">
        Estimated Wait Time
      </h2>

      {/* Clock section */}
      <div className="flex-1 flex items-center justify-center relative">

        {/* Gradient Background Behind the Circle */}
        <div
          className="absolute w-[110px] h-[110px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(16,192,182,0.55), rgba(104,77,123,0.18))",
            filter: "blur(4px)",
          }}
        />

        <svg
          className="w-[120px] h-[120px] transform -rotate-90 relative z-10"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="gradientStroke" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10C0B6" />
              <stop offset="100%" stopColor="#684D7B" />
            </linearGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="8"
          />

          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradientStroke)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <FaClock size={25} className="text-[#10C0B6] mb-1" />
          <div className="text-[18px] font-bold text-[#684D7B] leading-none">
            {formatTime(time)}
          </div>
        </div>
      </div>

      {appointmentNumber?.appointmentNumber && (
        <div className="flex justify-center mt-3">
          <button
            onClick={handleCancelEnrollment}
            className="
              w-[230px]
              bg-[#5E2E86]
              text-white text-[14px] font-medium
              py-2 rounded-full
              hover:bg-[#4a1f68]
              transition-all duration-200
            "
          >
            Take me off the Waiting List
          </button>
        </div>
      )}
    </div>
  );
};

export default EstimatedTime;
