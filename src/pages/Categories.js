// src/pages/Categories.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./Categories.module.css";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");

  // Dummy categories for now
  const dummyCategories = [
    { id: "1", name: "Appetizers" },
    { id: "2", name: "Main Course" },
    { id: "3", name: "Desserts" },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    // we'll add Firestore logic later
    alert(`Adding category: ${categoryName}`);
    setCategoryName("");
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <h2>Manage Categories</h2>

        <form onSubmit={handleAdd} className={styles.form}>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Add Category</button>
        </form>

        <ul className={styles.list}>
          {dummyCategories.map((cat) => (
            <li key={cat.id} className={styles.item}>
              <span>{cat.name}</span>
              <div className={styles.actions}>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
