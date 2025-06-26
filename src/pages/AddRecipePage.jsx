import React, { useEffect, useContext } from "react";
import RecipeForm from "../components/RecipeForm";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AddRecipePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleAdd = async (newRecipe) => {
    try {
      const token = localStorage.getItem("authToken");

      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      const response = await fetch(`${API_BASE}/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newRecipe,
          image_url: newRecipe.imageUrl,
        }),
      });

      if (response.ok) {
        navigate("/recipes");
      } else {
        console.error("Failed to add recipe");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "white", marginTop: "3rem" }}>
        Add a New Recipe
      </h1>
      <RecipeForm onSubmit={handleAdd} buttonLabel="Add Recipe" />
    </>
  );
}

export default AddRecipePage;

