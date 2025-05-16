// src/services/recipeService.js
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const recipeRef = collection(db, "recipes");

export const addRecipe = async (data) => {
  await addDoc(recipeRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getRecipes = async () => {
  const snapshot = await getDocs(recipeRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteRecipe = async (id) => {
  const recipeDoc = doc(db, "recipes", id);
  await deleteDoc(recipeDoc);
};

export const updateRecipe = async (id, updatedData) => {
  const recipeDoc = doc(db, "recipes", id);
  await updateDoc(recipeDoc, updatedData);
};