import ChangePassword from "../../components/app/changepassword/ChangePassword";
import DeletAccount from "../../components/app/changepassword/DeletAccount";
import Chat from "../../pages/app/Chat";
import Home from "../../pages/app/Home";
import Notification from "../../pages/app/Notification";
import Profile from "../../pages/app/Profile";

export const PublicRoutes = [
  {
    url: "home",
    page: <Home />,
  },

  {
    url: "notifications",
    page: <Notification />,
  },
  {
    url: "chat",
    page: <Chat />,
  },
];
