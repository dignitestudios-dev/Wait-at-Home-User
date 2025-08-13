import React from "react";
import { Adsimg } from "../../../assets/export";

const AdScreen = () => {
  return (
    <div className="relative w-[290px] rounded-[12px] overflow-hidden shadow-md">
      <img
        src={Adsimg}
        alt="Advertisement"
        className="w-full h-auto object-contain"
      />

      <div className="absolute bottom-0 left-0 w-full px-3 py-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
        <h3 className="text-[42px] font-[600] mb-1 text-center">Ads</h3>
        <p className="text-[13px] text-center font-[400] leading-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          adipiscing elit, sed do eiusmod tempor labore et dolore magna aliqua
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipis
        </p>
      </div>
    </div>
  );
};

export default AdScreen;
