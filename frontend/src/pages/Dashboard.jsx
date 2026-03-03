import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile")
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  if (!user) return <p className="p-8">Loading...</p>;

  return (
    <Layout role={user.role}>
      <h1 className="text-2xl font-semibold mb-6">
        Welcome, {user.name}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {user.role === "patient" && (
        <div className="flex flex-wrap gap-4">
          <ActionButton label="View Doctors" onClick={() => navigate("/doctors")} />
          <ActionButton label="Book Appointment" onClick={() => navigate("/book")} />
          <ActionButton label="My Appointments" onClick={() => navigate("/history")} />
          <ActionButton label="AI Suggest Doctor" onClick={() => navigate("/suggest")} />
          <ActionButton label="AI Chat" onClick={() => navigate("/chat")} />
        </div>
      )}

      {user.role === "doctor" && (
        <div className="flex gap-4">
          <ActionButton label="Create Availability" onClick={() => navigate("/availability")} />
          <ActionButton label="Doctor Dashboard" onClick={() => navigate("/doctor/dashboard")} />
        </div>
      )}
    </Layout>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow-sm"
    >
      {label}
    </button>
  );
}

export default Dashboard;