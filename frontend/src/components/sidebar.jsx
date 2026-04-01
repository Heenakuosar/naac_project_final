import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  GraduationCap,
  BarChart3,
  Notebook,
  Bell,
  Settings,
  HelpCircle,
  Calendar,
  LogOut,
  Home,
} from "lucide-react";

// simple className helper
const cn = (...classes) => classes.filter(Boolean).join(" ");

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [facultyOpen, setFacultyOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const facultyMembers = [
    "Prof. Abdul Wahid",
    "Prof. Pradeep Kumar",
    "Prof. Syed Imtiyaz Hassan",
    "Mrs. Khaleda Afroaz",
    "Ms. Tunga Arundhathi",
    "Dr. Kahkashan Tabassum",
    "Dr. A. Satya Sai Kumar",
    "Mrs. Afrah Fathima",
    "Mr. Ahmad Talha Siddiqui",
    "Dr. Mohd. Omar",
    "Mr. Mohd. Rafeeq",
    "Dr. Muqeem Ahmed",
    "Mr. Mohammad Islam",
    "Dr. Jameel Ahamed",
    "Mrs. Geeta Pattun",
    "Mr. Mohatesham Pasha Quadri",
    "Dr. Khaleel Ahmad",
    "Dr. Fareeha Rasheed",
  ];

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
              <Home className="text-white w-5 h-5" />
            </div>
            <span className="font-bold">MANUU</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 px-3 space-y-1">
        {/* Dashboard */}
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
            isActive("/dashboard")
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          )}
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard size={18} />
          {!collapsed && "Dashboard"}
        </button>

        {/* Faculty Dropdown */}
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => setFacultyOpen(!facultyOpen)}
        >
          <GraduationCap size={18} />
          {!collapsed && "Faculty"}
        </button>

        {!collapsed && facultyOpen && (
          <div className="ml-8 space-y-1">
            {facultyMembers.map((name, i) => (
              <div
                key={i}
                className="text-sm cursor-pointer text-gray-600 hover:text-black"
                onClick={() =>
                  navigate(`/dashboard/faculty/${encodeURIComponent(name)}`)
                }
              >
                {name}
              </div>
            ))}
          </div>
        )}

        {/* Other links */}
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/admission-enquiry")}
        >
          <BarChart3 size={18} />
          {!collapsed && "Admission Enquiry"}
        </button>

        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/notices")}
        >
          <Notebook size={18} />
          {!collapsed && "Notices"}
        </button>

        {/* New Forms */}
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/innovation")}
        >
          <Notebook size={18} />
          {!collapsed && "Innovation"}
        </button>

        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/patents-published")}
        >
          <Notebook size={18} />
          {!collapsed && "Patents Published"}
        </button>

        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/phds-awarded")}
        >
          <Notebook size={18} />
          {!collapsed && "PhD's Awarded"}
        </button>

        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/research-papers")}
        >
          <Notebook size={18} />
          {!collapsed && "Research Papers"}
        </button>

        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/books")}
        >
          <Notebook size={18} />
          {!collapsed && "Books"}
        </button>

        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate("/dashboard/collaborative-activity")}
        >
          <Notebook size={18} />
          {!collapsed && "Collaborative Activity"}
        </button>
      </div>

      {/* Bottom */}
      <div className="p-3 space-y-1 border-t">
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
          <Bell size={16} />
          {!collapsed && "Notifications"}
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
          <Settings size={16} />
          {!collapsed && "Settings"}
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
          <HelpCircle size={16} />
          {!collapsed && "Help"}
        </button>

        <button
          className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          onClick={() => navigate("/login")}
        >
          <LogOut size={16} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;