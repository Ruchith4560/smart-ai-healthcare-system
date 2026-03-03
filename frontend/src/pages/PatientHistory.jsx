import { useEffect, useState } from "react";
import API from "../services/api";

function PatientHistory() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data);
    } catch (err) {
      console.log("Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    try {
      await API.put(`/appointments/cancel/${appointmentId}`);
      alert("Appointment cancelled successfully");

      // Refresh appointments list
      fetchAppointments();

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.detail || "Error cancelling appointment");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
             <tr key={appt.id} className="hover:bg-slate-100 dark:hover:bg-slate-700 transition"> 
                <td>{appt.doctor_id}</td>

                <td>
                  {new Date(appt.appointment_time).toLocaleString()}
                </td>
                <td>
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      appt.status === "confirmed"
        ? "bg-green-100 text-green-600"
        : appt.status === "cancelled"
        ? "bg-gray-200 text-gray-600"
        : "bg-orange-100 text-orange-600"
    }`}
  >
    {appt.status}
  </span>
</td>

                

                <td>
                  {appt.status === "booked" && (
                    <button
                      onClick={() => handleCancel(appt.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientHistory;