import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    axios.get(`${process.env.REACT_APP_API_URL}/auth/user/me`, { withCredentials: true })
      .then((res) => {
        // backend response shape: { success: true, user: { ... } }
        if (res.data && res.data.success && res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
    }, []);

  if (loading) return <div>Loading...</div>; // Show loader while checking

  if (!user) {
    // Redirect to landing page if not logged in
    window.location.href = "/login";
    return null;
  }

  return (
    <>
          <TopBar username={user.username} />
          <Dashboard />
    </>
  );
};

export default Home;
