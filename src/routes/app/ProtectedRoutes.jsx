import ChangePassword from "../../components/app/changepassword/ChangePassword";
import DeletAccount from "../../components/app/changepassword/DeletAccount";
import Profile from "../../pages/app/Profile";

export const ProtectedRoutes = [
  {
    url: "profile",
    page: <Profile />,
  },

  {
    url: "change-password",
    page: <ChangePassword />,
  },

  {
    url: "delete-account",
    page: <DeletAccount />,
  },
];
