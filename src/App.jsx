import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import RecipeListPage from "./pages/RecipeListPage";
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from "./pages/EditRecipePage";
import MyRecipesPage from "./pages/MyRecipesPage";


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recipes" element={<RecipeListPage />} />
      <Route path="/add-recipe" element={<AddRecipePage />} />
      <Route path="/edit/:id" element={<EditRecipePage />} />
      <Route path="/my-recipes" element={<MyRecipesPage />} />
    </Routes>
    </>
  );
}

export default App;
