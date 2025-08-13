import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="  bg-[#b5d8dc]  flex justify-center items-center auth_bg p-3 md:py-8">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
