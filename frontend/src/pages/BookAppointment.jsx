import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function BookAppointment() {
  const location = useLocation();
  const passedDoctorId = location.state?.doctorId || "";

  const [doctorId, setDoctorId] = useState(passedDoctorId);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (passedDoctorId) {
      setDoctorId(passedDoctorId);
    }
  }, [passedDoctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorId || !appointmentTime) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/appointments/book", {
        doctor_id: Number(doctorId),
        appointment_time: new Date(appointmentTime).toISOString(),
      });

      alert("Appointment booked successfully");
      setAppointmentTime("");
    } catch (err) {
      alert(err.response?.data?.detail || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout role="patient">
      <h1 className="text-2xl font-semibold mb-6">
        Book Appointment
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-sm max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Doctor ID
            </label>
            <input
              type="number"
              value={doctorId}
              disabled={!!passedDoctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Appointment Date & Time
            </label>
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </form>
      </div>
    </Layout>
  );
}

export default BookAppointment;