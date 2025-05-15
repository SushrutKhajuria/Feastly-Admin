// src/components/Sidebar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Feastly Admin</h2>
      <nav className={styles.nav}>
        <NavLink to="/dashboard" className={styles.link}>Dashboard</NavLink>
        <NavLink to="/categories" className={styles.link}>Categories</NavLink>
        <NavLink to="/recipes" className={styles.link}>Recipes</NavLink>
        <NavLink to="/orders" className={styles.link}>Orders</NavLink>
      </nav>
      <button onClick={handleLogout} className={styles.logout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
