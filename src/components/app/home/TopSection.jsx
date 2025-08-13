import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import ChatAndNotiBtn from "../../global/ChatAndNotiBtn";

const TopSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4  p-4 rounded-xl">
      <div className="flex-1">
        <h2 className="text-[24px] font-[600] text-white mb-2">Wait At Home</h2>
        <div className="flex items-start gap-2 text-white text-[14px] font-[400] leading-relaxed">
          <IoAlertCircleOutline size={24} className="mt-1 min-w-[24px]" />
          <p>
            We are processing patients in order. Stay nearby, and we’ll notify
            you. Lorem ipsum dolor sit amet consectetur. Vulputate convallis
            arcu ac etiam justo pretium eros purus. Enim nec quam in at dis
            facilisi. Tortor at lorem non vitae pellentesque malesuada. Nec
            gravida in nisi aliquam a.
          </p>
        </div>
      </div>

      <ChatAndNotiBtn />
    </div>
  );
};

export default TopSection;
