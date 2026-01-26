/* eslint-disable react/prop-types */
import { useEffect } from "react";

const CountDown = ({ isActive, setIsActive, seconds, setSeconds }) => {
  useEffect(() => {
    let timer;

    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds, setIsActive, setSeconds]);

  // ✅ format mm:ss
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <span className="countdown">
      <p className="text-[13px] text-[#0e1014] font-bold">
        {formatTime(seconds)}
      </p>
    </span>
  );
};

export default CountDown;
