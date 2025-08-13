import ForgotPassword from "../../pages/authentication/ForgotPassword";
import Login from "../../pages/authentication/Login";
import OtpForgot from "../../pages/authentication/OtpForgot";
import ResetPassword from "../../pages/authentication/ResetPassword";

export const AuthenticationRoutes = [
  {
    url: "login",
    page: <Login />,
  },
  {
    url: "forgot-password",
    page: <ForgotPassword />,
  },
  {
    url: "otp-forgot",
    page: <OtpForgot />,
  },
  {
    url: "reset-password",
    page: <ResetPassword />,
  },
];
