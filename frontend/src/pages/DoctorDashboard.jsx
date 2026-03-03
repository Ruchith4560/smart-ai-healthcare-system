import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.get("/profile").then((res) => setUser(res.data));

    API.get("/appointments/my")
      .then((res) => setAppointments(res.data))
      .catch(() => setAppointments([]));
  }, []);

  if (!user) return null;

  const total = appointments.length;
  const confirmed = appointments.filter(a => a.status === "confirmed").length;
  const pending = appointments.filter(a => a.status === "booked").length;

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard Overview
      </h1>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-slate-500 text-sm">Total Appointments</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{total}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-slate-500 text-sm">Confirmed</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{confirmed}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-slate-500 text-sm">Pending</h2>
          <p className="text-3xl font-bold text-orange-500 mt-2">{pending}</p>
        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;