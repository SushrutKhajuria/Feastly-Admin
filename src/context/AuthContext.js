// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Firebase listener to track login/logout state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // Login function
  const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logoutUser = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser, authLoading }}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to access context
export const useAuth = () => {
  return useContext(AuthContext);
};
