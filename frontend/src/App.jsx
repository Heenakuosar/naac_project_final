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
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    if (hasToken) {
      navigate("/dashboard");
    } else if (!isAuthPage) {
      navigate("/login");
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
