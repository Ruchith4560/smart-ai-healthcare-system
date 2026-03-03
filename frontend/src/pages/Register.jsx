import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", {
        name,
        email,
        password,
        role,
        specialization
      });

      alert("Registered successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      {role === "doctor" && (
        <input
          placeholder="Specialization"
          onChange={(e) => setSpecialization(e.target.value)}
        />
      )}

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;