import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./Recipes.module.css";
import { getCategories } from "../services/categoryService";
import {
  addRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
} from "../services/recipeService";

const Recipes = () => {
  const [recipeName, setRecipeName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editedRecipe, setEditedRecipe] = useState({
    name: "",
    ingredients: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await getCategories();
      const recipeData = await getRecipes();

      setCategories(categoryData);
      setRecipes(recipeData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!recipeName.trim() || !ingredients.trim() || !price || !category) return;

    const newRecipe = {
      name: recipeName,
      ingredients,
      price: parseFloat(price),
      category,
    };

    await addRecipe(newRecipe);
    const updated = await getRecipes();
    setRecipes(updated);

    setRecipeName("");
    setIngredients("");
    setPrice("");
    setCategory("");
  };

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    const updated = await getRecipes();
    setRecipes(updated);
  };

  const handleEditStart = (rec) => {
    setEditingId(rec.id);
    setEditedRecipe({
      name: rec.name,
      ingredients: rec.ingredients,
      price: rec.price,
      category: rec.category,
    });
  };

  const handleSaveEdit = async (id) => {
    if (
      !editedRecipe.name.trim() ||
      !editedRecipe.ingredients.trim() ||
      !editedRecipe.price ||
      !editedRecipe.category
    ) return;

    await updateRecipe(id, {
      name: editedRecipe.name,
      ingredients: editedRecipe.ingredients,
      price: parseFloat(editedRecipe.price),
      category: editedRecipe.category,
    });

    const updated = await getRecipes();
    setRecipes(updated);
    setEditingId(null);
    setEditedRecipe({
      name: "",
      ingredients: "",
      price: "",
      category: "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedRecipe({
      name: "",
      ingredients: "",
      price: "",
      category: "",
    });
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <h2>Manage Recipes</h2>

        <form onSubmit={handleAdd} className={styles.form}>
          <input
            type="text"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className={styles.input}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={styles.input}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.button}>Add Recipe</button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.list}>
            {recipes.map((rec) => (
              <li key={rec.id} className={styles.item}>
                {editingId === rec.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedRecipe.name}
                      onChange={(e) =>
                        setEditedRecipe((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className={styles.input}
                    />
                    <select
                      value={editedRecipe.category}
                      onChange={(e) =>
                        setEditedRecipe((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className={styles.input}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editedRecipe.ingredients}
                      onChange={(e) =>
                        setEditedRecipe((prev) => ({ ...prev, ingredients: e.target.value }))
                      }
                      className={styles.input}
                    />
                    <input
                      type="number"
                      value={editedRecipe.price}
                      onChange={(e) =>
                        setEditedRecipe((prev) => ({ ...prev, price: e.target.value }))
                      }
                      className={styles.input}
                    />
                    <div className={styles.actions}>
                      <button onClick={() => handleSaveEdit(rec.id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <strong>{rec.name}</strong> ({rec.category})
                      <p>{rec.ingredients}</p>
                      <p>₹{rec.price}</p>
                    </div>
                    <div className={styles.actions}>
                      <button onClick={() => handleEditStart(rec)}>Edit</button>
                      <button onClick={() => handleDelete(rec.id)}>Delete</button>
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

export default Recipes;
