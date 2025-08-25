import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage } from "../assets/export";
import Navbar from "../components/layout/Navbar";
const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      setOpenNoInternet(true);
    }
  }, []);
  return (
    <div className="w-full bg-[#7ec0c5] flex flex-col justify-start items-start p-10">
      <div className="w-full ">
        <Navbar />
      </div>
      <img src={NoInternetImage} alt="" className="hidden" />
      <div className="w-full lex justify-start items-start">

        <div className="p-4 ">
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
