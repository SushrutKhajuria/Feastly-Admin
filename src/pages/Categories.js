// src/pages/Categories.js
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./Categories.module.css";
import { addCategory, getCategories, deleteCategory, updateCategory} from "../services/categoryService";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");


  // Fetch categories on load
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    await addCategory(categoryName);
    const updated = await getCategories();
    setCategories(updated);
    setCategoryName("");
  };

  const handleDelete = async (id) => {
  await deleteCategory(id);
  const updated = await getCategories();
  setCategories(updated);
};

const handleEditStart = (cat) => {
  setEditingId(cat.id);
  setEditedName(cat.name);
};

const handleSaveEdit = async (id) => {
  if (!editedName.trim()) return;
  await updateCategory(id, editedName);
  const updated = await getCategories();
  setCategories(updated);
  setEditingId(null);
  setEditedName("");
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

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.list}>
  {categories.map((cat) => (
    <li key={cat.id} className={styles.item}>
      {editingId === cat.id ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className={styles.input}
          />
          <div className={styles.actions}>
            <button onClick={() => handleSaveEdit(cat.id)}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span>{cat.name}</span>
          <div className={styles.actions}>
            <button onClick={() => handleEditStart(cat)}>Edit</button>
            <button onClick={() => handleDelete(cat.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  ))}
</ul>

        )}
      </div>
    </>
  );
};

export default Categories;
