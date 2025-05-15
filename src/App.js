// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./pages/Categories";



const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute>
                                          <Dashboard />
                                        </PrivateRoute>} />

      <Route path="/categories" element={ <PrivateRoute>
                                          <Categories />
                                        </PrivateRoute>

      } />      
    </Routes>
  );
};

export default App;
