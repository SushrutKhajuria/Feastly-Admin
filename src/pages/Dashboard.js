// src/pages/Dashboard.js
import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: "240px", padding: "20px" }}>
        <h2>Dashboard Overview</h2>
      </div>
    </div>
  );
};

export default Dashboard;
