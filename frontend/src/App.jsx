import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientHistory from "./pages/PatientHistory";
import SuggestDoctor from "./pages/SuggestDoctor";
import AIChat from "./pages/AIChat";
import Availability from "./pages/CreateAvailability";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/book" element={<BookAppointment />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      <Route path="/history" element={<PatientHistory />} />
      <Route path="/suggest" element={<SuggestDoctor />} />
      <Route path="/chat" element={<AIChat />} />
      <Route path="/availability" element={<Availability />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;