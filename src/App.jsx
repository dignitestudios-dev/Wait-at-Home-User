import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/app/Home";
import { AuthenticationRoutes } from "./routes/authentication/AuthenticationRoute";
import { PublicRoutes } from "./routes/app/PublicRoutes";
import DashboardLayout from "../src/layouts/DashboardLayout";
import Cookies from "js-cookie";
import { ProtectedRoutes } from "./routes/app/ProtectedRoutes";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
function App() {
  const { token } = useContext(AppContext);
  console.log(token, "token==>");
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/app/home"} />} />

      <Route path="app" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        {PublicRoutes?.map((Link, i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}

        {ProtectedRoutes?.map((Link, i) => (
          <Route
            key={i}
            path={Link.url}
            element={token ? Link.page : <Navigate to="/app/home" />}
          />
        ))}
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<div className="text-7xl">Page Not Found</div>} />
        {AuthenticationRoutes?.map((Link, i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
