import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/doctors")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  return (
    <div>
      <h2>Doctors List</h2>

      {doctors.map((doc) => (
        <div key={doc.id}>
          <p>Name: {doc.name}</p>
          <p>Specialization: {doc.specialization}</p>

          <button
            onClick={() =>
              navigate("/book", { state: { doctorId: doc.id } })
            }
          >
            Book Appointment
          </button>

          <hr />
        </div>
      ))}
    </div>

  );
  
}

export default Doctors;