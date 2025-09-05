import React, { useState, useEffect, useContext } from "react";
import { CgLock } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import { useFetchById, useGlobal } from "../../../hooks/api/Get";
import { AppContext } from "../../../context/AppContext";

const EstimatedTime = ({ update, data, loading }) => {
  const [time, setTime] = useState(0); // default 00:00
  const { appointmentData } = useContext(AppContext);

  useEffect(() => {
    if (data && typeof data.estimatedWaitMinutes === "number") {
      setTime(data.estimatedWaitMinutes * 60);
    } else {
      setTime(0);
    }
  }, [data, appointmentData?.signUpRecord, update]);

  useEffect(() => {
    if (!time) return; // agar time 0 hai to countdown na chale
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
    : 0; // agar API nahi call hui to 0 rakho

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    maxTime > 0
      ? circumference - (time / maxTime) * circumference
      : circumference;

  return (
    <div className="bg-[#b5d8dc] border backdrop-blur-sm rounded-3xl p-8 w-full shadow-lg">
      <h2 className="text-xl font-medium text-gray-800 mb-8">
        Estimated Wait Time
      </h2>

      <div className="relative flex items-center justify-center">
        <div className="relative">
          <svg
            className="w-full h-full transform -rotate-90"
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

          <div className="absolute inset-0 flex flex-col items-center justify-center">
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
