import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/profile").then((res) => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg transition">

        <div className="flex items-center gap-6 mb-8">
          <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-3xl font-bold text-blue-600">
            {user.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <span className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900 text-blue-600 rounded-full">
              {user.role}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-slate-600 dark:text-slate-300">
          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Account Type</p>
            <p className="text-lg capitalize">{user.role}</p>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Profile;