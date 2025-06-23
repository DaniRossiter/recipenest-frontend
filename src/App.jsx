import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import RecipeListPage from "./pages/RecipeListPage";
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from "./pages/EditRecipePage";
import MyRecipesPage from "./pages/MyRecipesPage";
import RecipeDetailPage from './pages/RecipeDetailPage';
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipeListPage searchTerm={searchTerm} />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
        <Route path="/my-recipes" element={<MyRecipesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

