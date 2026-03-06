import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Home,
  Users,
  Calendar,
  History,
  MessageSquare,
  Clock,
  User,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  Stethoscope
} from "lucide-react";

function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="animate-bounce-in">
        <Stethoscope className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <p className="text-slate-600 text-lg">Loading...</p>
      </div>
    </div>
  );

  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
  ];

  if (user.role === "patient") {
    navItems.push(
      { to: "/doctors", icon: Users, label: "Doctors" },
      { to: "/book", icon: Calendar, label: "Book Appointment" },
      { to: "/history", icon: History, label: "My Appointments" },
      { to: "/chat", icon: MessageSquare, label: "AI Assistant" }
    );
  } else if (user.role === "doctor") {
    navItems.push(
      { to: "/availability", icon: Clock, label: "Availability" },
      { to: "/doctor/dashboard", icon: Calendar, label: "Appointments" }
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-300">

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl p-8 transform transition-all duration-300 border-r border-slate-200 dark:border-slate-700
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <Stethoscope className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Smart AI Healthcare
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-8">
          <Link
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group"
          >
            <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Profile</span>
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center space-x-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-3 rounded-xl transition-all duration-200"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full min-w-0">

        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg px-6 py-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">

          {/* Hamburger (Mobile Only) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-slate-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Welcome back, {user.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 capitalize flex items-center">
                <User className="w-4 h-4 mr-1" />
                {user.role}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="hidden md:block text-slate-500 dark:text-slate-400 text-sm">
            Smart AI Healthcare System
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 animate-fade-in flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;