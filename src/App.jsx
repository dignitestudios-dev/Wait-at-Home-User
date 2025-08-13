import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/app/Home";
import { AuthenticationRoutes } from "./routes/authentication/AuthenticationRoute";
import { PublicRoutes } from "./routes/app/PublicRoutes";
import DashboardLayout from '../src/layouts/DashboardLayout'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/app/home"} />} />

      <Route path="app" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        {PublicRoutes?.map((Link, i) => (
          <Route path={Link.url} key={i} element={Link.page} />
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
