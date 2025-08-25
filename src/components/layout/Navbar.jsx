import { GoAlertFill } from "react-icons/go";
import { Logo, MobileLogo } from "../../assets/export";
import { useContext, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, userData, petData } = useContext(AppContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`${
        path === "/app/change-password" || path === "/app/delete-account"
          ? "hidden"
          : "block"
      } w-full`}
    >
      <div className="relative mx-auto h-[104px] px-4 md:px-5 flex items-center justify-between flex-wrap gap-2 z-50">
        <div className="absolute inset-0 z-10 rounded-[32px] backdrop-blur-[6px] bg-[#b5d8dc] border border-white shadow-md" />

        <div className="relative z-20 flex items-center justify-between w-full cursor-pointer">
          <div
            className="flex items-center gap-2"
            onClick={() => navigate("/app/home")}
          >
            <img
              src={MobileLogo}
              alt="logo"
              className="h-[50px] w-auto block md:hidden"
            />
            <img
              src={Logo}
              alt="logo"
              className="h-[50px] w-auto hidden md:block"
            />
          </div>

          <div className="hidden min-[769px]:flex items-center gap-4 flex-wrap">
            <div className="flex items-center p-2 gap-2 w-[206px] bg-[#FF9E9E66] h-[66px] text-[#EE3131] rounded-[20px] border-[1.3px] border-[#EE3131] shadow-sm">
              <span className="bg-white flex justify-center items-center rounded-full h-[32px] w-[32px]">
                <GoAlertFill className="text-[#EE3131]" size={17} />
              </span>
              <div className="text-sm leading-tight">
                <div className="font-[500] text-[18px]">+1 (800) 123 4567</div>
                <div className="text-[13px] font-[400] text-[#000000]">
                  Emergency Contact
                </div>
              </div>
            </div>
            {userData ? (
              userData?.isUserRegistered ? (
                <div
                  onClick={() => navigate("/app/profile")}
                  className="h-[66px] rounded-[20px] border p-3 border-[#10C0B6] flex gap-2 items-center"
                >
                  <img
                    src={userData?.profilePicture}
                    className="w-[42px] h-[42px] rounded-full object-cover"
                    alt="Profile"
                  />
                  <h2 className="text-[18px] font-[500]">{userData?.name}</h2>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => navigate("/app/profile")}
                    className="flex justify-center items-center gap-2 rounded-[20px] bg-[#00AAAD] h-[42px] w-[42px] cursor-pointer"
                  >
                    <span className="text-[18px] font-[600] text-white">
                      {userData?.name?.charAt(0)}
                    </span>
                  </div>
                  <div
                    onClick={() => navigate("/auth/login")}
                    className="rounded-[20px] w-[106px] border-[1px] border-transparent bg-gradient-to-r from-[#10C0B6] to-[#684D7B] bg-origin-border"
                  >
                    <div className="rounded-[20px] bg-[#c3d8df] px-6 py-2 h-[66px] flex items-center justify-center text-black text-[18px] font-[500] cursor-pointer">
                      Login
                    </div>
                  </div>
                </>
              )
            ) : (
              <div
                onClick={() => navigate("/auth/login")}
                className="rounded-[20px] w-[106px] border-[1px] border-transparent bg-gradient-to-r from-[#10C0B6] to-[#684D7B] bg-origin-border"
              >
                <div className="rounded-[20px] bg-[#c3d8df] px-6 py-2 h-[66px] flex items-center justify-center text-black text-[18px] font-[500] cursor-pointer">
                  Login
                </div>
              </div>
            )}
          </div>

          <div className="block min-[769px]:hidden">
            <button onClick={() => setDrawerOpen(true)}>
              <HiOutlineMenuAlt3 className="text-[32px] text-gray-800" />
            </button>
          </div>
        </div>

        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 right-0 h-full w-[260px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <span className="text-lg font-bold text-gray-800">Menu</span>
            <HiX
              className="text-2xl cursor-pointer"
              onClick={() => setDrawerOpen(false)}
            />
          </div>

          <div className="flex flex-col gap-4 px-4 py-6">
            <div className="flex items-center p-2 gap-2 w-full bg-[#FF9E9E66] h-[66px] text-[#EE3131] rounded-[20px] border-[1.3px] border-[#EE3131] shadow-sm">
              <span className="bg-white flex justify-center items-center rounded-full h-[32px] w-[32px]">
                <GoAlertFill className="text-[#EE3131]" size={17} />
              </span>
              <div className="text-sm leading-tight">
                <div className="font-[500] text-[18px]">+1 (800) 123 4567</div>
                <div className="text-[13px] font-[400] text-[#000000]">
                  Emergency Contact
                </div>
              </div>
            </div>

            {userData && (
              <div className="flex items-center gap-2 rounded-[20px] bg-[#00AAAD] h-[42px] w-[42px] cursor-pointer">
                <span className="text-[18px] font-[600] text-white ml-2">
                  {userData?.name?.charAt(0)}
                </span>
              </div>
            )}

            <div
              onClick={() => {
                setDrawerOpen(false);
              }}
              className="rounded-[20px] w-full border-[1px] border-transparent bg-gradient-to-r from-[#10C0B6] to-[#684D7B] bg-origin-border"
            >
              <div className="rounded-[20px] bg-[#c3d8df] px-6 py-2 h-[66px] flex items-center justify-center text-black text-[18px] font-[500] cursor-pointer">
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
