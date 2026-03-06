import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import {
  Calendar,
  Users,
  MessageSquare,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
  });

  useEffect(() => {
    API.get("/profile").then((res) => setUser(res.data));

    if (user?.role === "patient") {
      // Fetch patient stats
      API.get("/patient/history").then((res) => {
        const history = res.data;
        setStats({
          totalAppointments: history.length,
          upcomingAppointments: history.filter(h => h.status === 'upcoming').length,
          completedAppointments: history.filter(h => h.status === 'completed').length,
        });
      });
    }
  }, [user]);

  const patientActions = [
    {
      title: "Book Appointment",
      description: "Schedule a new appointment with a doctor",
      icon: Calendar,
      link: "/book",
      color: "bg-primary-500 hover:bg-primary-600",
    },
    {
      title: "Find Doctors",
      description: "Browse available doctors by specialization",
      icon: Users,
      link: "/doctors",
      color: "bg-secondary-500 hover:bg-secondary-600",
    },
    {
      title: "AI Assistant",
      description: "Get medical advice from our AI chatbot",
      icon: MessageSquare,
      link: "/chat",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "My History",
      description: "View your appointment history and records",
      icon: Activity,
      link: "/history",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  const doctorActions = [
    {
      title: "Set Availability",
      description: "Manage your available time slots",
      icon: Clock,
      link: "/availability",
      color: "bg-primary-500 hover:bg-primary-600",
    },
    {
      title: "View Appointments",
      description: "See and manage your appointments",
      icon: Calendar,
      link: "/doctor/dashboard",
      color: "bg-secondary-500 hover:bg-secondary-600",
    },
  ];

  const actions = user?.role === "patient" ? patientActions : doctorActions;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Here's what's happening with your healthcare today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                <Activity className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards (for patients) */}
        {user?.role === "patient" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {stats.totalAppointments}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Total Appointments
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-secondary-100 dark:bg-secondary-900 rounded-xl">
                  <Clock className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {stats.upcomingAppointments}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Upcoming
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {stats.completedAppointments}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`card card-hover group ${action.color} text-white transition-all duration-200`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <action.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity or Tips */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Health Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
              <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                Stay Hydrated
              </h4>
              <p className="text-sm text-primary-600 dark:text-primary-300">
                Drink at least 8 glasses of water daily to maintain good health.
              </p>
            </div>
            <div className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl">
              <h4 className="font-semibold text-secondary-800 dark:text-secondary-200 mb-2">
                Regular Check-ups
              </h4>
              <p className="text-sm text-secondary-600 dark:text-secondary-300">
                Schedule regular health check-ups to prevent potential issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;