// src/services/categoryService.js
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

const categoriesRef = collection(db, "categories");

export const addCategory = async (name) => {
  await addDoc(categoriesRef, {
    name,
    createdAt: serverTimestamp(),
  });
};

export const deleteCategory = async (id) => {
  const categoryDoc = doc(db, "categories", id);
  await deleteDoc(categoryDoc);
};

export const updateCategory = async (id, newName) => {
  const categoryDoc = doc(db, "categories", id);
  await updateDoc(categoryDoc, { name: newName });
};



export const getCategories = async () => {
  const snapshot = await getDocs(categoriesRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

