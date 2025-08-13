import React, { useState, useEffect } from "react";
import { CgLock } from "react-icons/cg";
import { FaClock } from "react-icons/fa";

const EstimatedTime = () => {
  const [time, setTime] = useState(5400); // 1 hour 30 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (time / 5400) * circumference;

  return (
    <div className="bg-[#b5d8dc] border backdrop-blur-sm rounded-3xl p-8 w-full shadow-lg">
      <h2 className="text-xl font-medium text-gray-800 mb-8">
        Estimated Wait Time
      </h2>

      <div className="relative flex items-center justify-center ">
        <div className="relative ">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradientStroke" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10C0B6" />
                <stop offset="100%" stopColor="#684D7B" />
              </linearGradient>
            </defs>

            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="8"
            />

            {/* Progress Circle with Gradient */}
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

          {/* Center Content */}
          <div className="absolute inset-0  flex flex-col items-center justify-center">
            <FaClock size={25} className=" text-[#10C0B6] mb-2" />
            <div className="text-[43.03px] font-bold text-[#684D7B]">
              {formatTime(time)}
            </div>
            <div className="text-[12.55px] text-[#684D7B] mt-1">
              Estimated Waiting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedTime;
