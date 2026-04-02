import React, { useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Home from "./views/home"
import Login from "./views/login"
import Register from "./views/register"
import DashboardLayout from "./layout/dashboardLayout"
//import SeedMoneyForm from './views/SeedMoneyForm'
import { Toaster } from "react-hot-toast"


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasToken = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const dashboardPath = user?.role === "faculty" ? "/dashboard/seed-money" : "/dashboard";
    const isAuthPage = ["/login", "/register"].includes(location.pathname);
    const isDashboardPath = location.pathname.startsWith("/dashboard");

    // Logged-in users: send only from auth pages/root to dashboard
    if (hasToken) {
      if (isAuthPage || location.pathname === "/") {
        navigate(dashboardPath, { replace: true });
      }
      return;
    }

    // Logged-out users: block dashboard routes
    if (!hasToken && isDashboardPath) {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
