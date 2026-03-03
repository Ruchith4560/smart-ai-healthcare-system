import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import ProtectedRoute from "./components/ProtectedRoute";
import BookAppointment from "./pages/BookAppointment";
import CreateAvailability from "./pages/CreateAvailability";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientHistory from "./pages/PatientHistory";
import SuggestDoctor from "./pages/SuggestDoctor";
import AIChat from "./pages/AIChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route path="/suggest" element={<SuggestDoctor />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute> 
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route
  path="/book"
  element={
    <ProtectedRoute>
      <BookAppointment />
    </ProtectedRoute>
  }
/>
<Route
  path="/availability"
  element={
    <ProtectedRoute>
      <CreateAvailability />
    </ProtectedRoute>
  }
/>
<Route
  path="/doctor/dashboard"
  element={
    <ProtectedRoute>
      <DoctorDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/history"
  element={
    <ProtectedRoute>
      <PatientHistory />
    </ProtectedRoute>
  }
/>
<Route path="/chat" element={<AIChat />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;