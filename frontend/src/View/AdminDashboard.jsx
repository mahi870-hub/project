import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login"); // Or redirect to a Not Authorized page
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}

export default AdminDashboard;
