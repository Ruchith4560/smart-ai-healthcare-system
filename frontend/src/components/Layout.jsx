import { useNavigate } from "react-router-dom";

function Layout({ children, role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-sidebar text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-8">Smart Health</h2>

          {role === "patient" && (
            <div className="space-y-4">
              <SidebarLink label="Dashboard" onClick={() => navigate("/dashboard")} />
              <SidebarLink label="Book Appointment" onClick={() => navigate("/book")} />
              <SidebarLink label="My Appointments" onClick={() => navigate("/history")} />
              <SidebarLink label="AI Suggest" onClick={() => navigate("/suggest")} />
              <SidebarLink label="AI Chat" onClick={() => navigate("/chat")} />
            </div>
          )}

          {role === "doctor" && (
            <div className="space-y-4">
              <SidebarLink label="Dashboard" onClick={() => navigate("/doctor/dashboard")} />
              <SidebarLink label="Availability" onClick={() => navigate("/availability")} />
              <SidebarLink label="AI Chat" onClick={() => navigate("/chat")} />
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-background p-8">
        {children}
      </div>
    </div>
  );
}

function SidebarLink({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer text-gray-300 hover:text-white transition"
    >
      {label}
    </div>
  );
}

export default Layout;