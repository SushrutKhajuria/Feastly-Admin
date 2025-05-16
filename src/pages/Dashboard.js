// src/pages/Dashboard.js
import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const totalCategories = 6;
  const totalRecipes = 12;
  const totalOrders = 25;
  const pendingOrders = 5;

  return (
    <>
      <Sidebar />
      <div className={styles.dashboardContainer}>
        <h2 className={styles.title}>Dashboard Overview</h2>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Categories</p>
            <p className={styles.cardValue}>{totalCategories}</p>
            <Link to="/categories" className={styles.cardLink}>
              View All Categories →
            </Link>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>Recipes</p>
            <p className={styles.cardValue}>{totalRecipes}</p>
            <Link to="/recipes" className={styles.cardLink}>
              View All Recipes →
            </Link>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>Total Orders</p>
            <p className={styles.cardValue}>{totalOrders}</p>
            <Link to="/orders" className={styles.cardLink}>
              View All Orders →
            </Link>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>Pending Orders</p>
            <p className={styles.cardValue}>{pendingOrders}</p>
            <Link to="/orders?filter=pending" className={styles.cardLink}>
              View Pending Orders →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
