import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/doctors");
        setDoctors(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("Error fetching doctors:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBook = (doctorId) => {
    navigate("/book", { state: { doctorId } });
  };

  return (
    <Layout role="patient">
      <h1 className="text-2xl font-semibold mb-6">
        Available Doctors
      </h1>

      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-2">
                Dr. {doc.name}
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                {doc.specialization || "General Physician"}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  ID: {doc.id}
                </span>

                <button
                  onClick={() => handleBook(doc.id)}
                  className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Doctors;