import { useState } from "react";
import API from "../services/api";

function SuggestDoctor() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptoms.trim()) {
      alert("Please enter symptoms");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/ai/suggest-doctor", {
        symptoms: symptoms.split(",").map(s => s.trim())
      });

      console.log("AI Response:", res.data);

      setResult(res.data);

    } catch (err) {
      alert(err.response?.data?.detail || "Error getting suggestion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Doctor Suggestion</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter symptoms separated by commas (e.g., fever, headache)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows="4"
          cols="50"
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Get Suggestion"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Suggested Specialization:</h3>
          <p>{result.recommended_specialization}</p>

          <h4>Available Doctors:</h4>
          {result.available_doctors.length === 0 ? (
            <p>No doctors available</p>
          ) : (
            <ul>
              {result.available_doctors.map((doc) => (
                <li key={doc.id}>
                  {doc.name} (ID: {doc.id})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestDoctor;