import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    specialization: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-sm w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        {form.role === "doctor" && (
          <input
            name="specialization"
            placeholder="Specialization"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />
        )}

        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;