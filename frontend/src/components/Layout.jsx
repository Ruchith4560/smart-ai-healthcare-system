import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

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

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 shadow-xl p-6 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold text-blue-600 mb-10">
          Smart AI
        </h1>

        <nav className="flex flex-col gap-4 text-slate-600 dark:text-slate-300 font-medium">

          <Link
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-blue-600 hover:translate-x-1 transition duration-200"
          >
            Dashboard
          </Link>

          {user.role === "patient" && (
            <>
              <Link
                to="/doctors"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-blue-600 hover:translate-x-1 transition duration-200"
              >
                Doctors
              </Link>

              <Link
                to="/book"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-blue-600 hover:translate-x-1 transition duration-200"
              >
                Book Appointment
              </Link>

              <Link
                to="/history"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-blue-600 hover:translate-x-1 transition duration-200"
              >
                My Appointments
              </Link>

              <Link
                to="/chat"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-blue-600 hover:translate-x-1 transition duration-200"
              >
                AI Assistant
              </Link>
            </>
          )}

          {user.role === "doctor" && (
            <>
              <Link
                to="/availability"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-blue-600 hover:translate-x-1 transition duration-200"
              >
                Availability
              </Link>

              <Link
                to="/doctor/dashboard"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-blue-600 hover:translate-x-1 transition duration-200"
              >
                Appointments
              </Link>
            </>
          )}
        </nav>

        <div className="mt-auto space-y-4 pt-6">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-lg transition"
          >
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          >
            Logout
          </button>
          <Link
  to="/profile"
  onClick={() => setSidebarOpen(false)}
  className="hover:text-blue-600 hover:translate-x-1 transition duration-200"
>
  Profile
</Link>

        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">

        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-md px-6 py-4 flex justify-between items-center">

          {/* Hamburger (Mobile Only) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-slate-700 dark:text-white text-2xl"
          >
            ☰
          </button>

          <div>
            <h2 className="text-lg font-semibold">
              Welcome, {user.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
              {user.role}
            </p>
          </div>

          <div className="hidden md:block text-slate-500 dark:text-slate-400 text-sm">
            Smart AI Healthcare System
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 animate-fadeIn">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;