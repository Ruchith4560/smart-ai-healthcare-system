import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-sm w-96 space-y-6"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Login
        </button>
        <Link to="/register" className="text-blue-500 hover:underline">
          Don't have an account? Register
        </Link>
      </form>
    </div>
  );
}

export default Login;