import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ErrorToast } from "../components/global/Toaster";
import axios from "../axios";
import { useNavigate } from "react-router";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(() => {
    return Cookies.get("token") || null;
  });
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(() => {
    return Cookies.get("isEmailVerified") || null;
  });
  const [isPhoneVerified, setIsPhoneVerified] = useState(() => {
    return Cookies.get("isPhoneVerified") || null;
  });

  const [userData, setUserData] = useState(() => {
    const cookieData = Cookies.get("userData");
    return cookieData ? JSON.parse(cookieData) : null;
  });
  const [petData, setPetData] = useState(() => {
    const cookieData = Cookies.get("petData");
    return cookieData ? JSON.parse(cookieData) : null;
  });
  const [appointmentData, setAppointmentData] = useState(() => {
    const cookieData = Cookies.get("appointmentData");
    return cookieData ? JSON.parse(cookieData) : null;
  });

  const Auth = (data) => {
    if (!data?.data) return;

    if (data.data.user) {
      Cookies.set("userData", JSON.stringify(data.data.user), { expires: 7 });
      setUserData(data?.data?.user);
    }
    if (data.data.pet) {
      Cookies.set("petData", JSON.stringify(data.data.pet), { expires: 7 });
      setPetData(data.data.pet);
    }
    if (data.data.appointment) {
      Cookies.set("appointmentData", JSON.stringify(data.data.appointment), {
        expires: 7,
      });
      setAppointmentData(data.data.appointment);
    }
    if (data?.data?.token) {
      Cookies.set("token", data?.data?.token, { expires: 7 });
      setToken(data.data.token);
    }
    if (data?.data?.isEmailVerified) {
      Cookies.set("isEmailVerified", data?.data?.isEmailVerified, {
        expires: 7,
      });
      setIsVerifiedEmail(data?.data?.isEmailVerified);
    }
    if (data?.data?.isPhoneVerified) {
      Cookies.set("isPhoneVerified", data?.data?.isPhoneVerified, {
        expires: 7,
      });
      setIsPhoneVerified(data?.data?.isPhoneVerified);
    }
  };
  const clearAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      Cookies.remove(name.trim());
    }

    setUserData(null);
    setPetData(null);
    setAppointmentData(null);
    sessionStorage.clear();
  };
  const getAllAppoitment = async () => {
    try {
      const response = await axios.get("/appointment/get-all-appointments");
      if (response.status === 200) {
        if (response?.data?.data.length === 0) {
          clearAllCookies();
        }
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };
  useEffect(() => {
    getAllAppoitment();
  }, []);
  const handleLogOut = () => {
    clearAllCookies();
    navigate("/app/home");
  };
  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        userData,
        petData,
        appointmentData,
        Auth,
        clearAllCookies,
        handleLogOut,
        token,
        isVerifiedEmail,
        isPhoneVerified,
        setIsPhoneVerified,
        setIsVerifiedEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
