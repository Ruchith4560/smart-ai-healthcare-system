import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Layout({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col p-6">

        <h1 className="text-2xl font-bold text-blue-600 mb-10">
          Smart AI
        </h1>

        <nav className="flex flex-col gap-4 text-slate-600 font-medium">

          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          {user.role === "patient" && (
            <>
              <Link to="/doctors" className="hover:text-blue-600">
                Doctors
              </Link>

              <Link to="/book" className="hover:text-blue-600">
                Book Appointment
              </Link>

              <Link to="/history" className="hover:text-blue-600">
                My Appointments
              </Link>

              <Link to="/chat" className="hover:text-blue-600">
                AI Assistant
              </Link>
            </>
          )}

          {user.role === "doctor" && (
            <>
              <Link to="/availability" className="hover:text-blue-600">
                Availability
              </Link>

              <Link to="/doctor/dashboard" className="hover:text-blue-600">
                Appointments
              </Link>
            </>
          )}

        </nav>

        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Header */}
        <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Welcome, {user.name}
            </h2>
            <p className="text-sm text-slate-500 capitalize">
              {user.role}
            </p>
          </div>

          <div className="text-slate-500 text-sm">
            Smart AI Healthcare System
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;