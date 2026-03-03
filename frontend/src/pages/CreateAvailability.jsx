import { useState } from "react";
import API from "../services/api";

function CreateAvailability() {
  const [dateTime, setDateTime] = useState("");

  const handleCreate = async () => {
    try {
      await API.post("/doctor/availability", {
        available_time: new Date(dateTime).toISOString(),
      });

      alert("Availability created successfully!");
    } catch (err) {
      console.log("Error:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div>
      <h2>Create Availability</h2>

      <input
        type="datetime-local"
        onChange={(e) => setDateTime(e.target.value)}
      />

      <button onClick={handleCreate}>
        Add Availability
      </button>
    </div>
  );
}

export default CreateAvailability;
