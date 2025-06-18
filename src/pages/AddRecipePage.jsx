import React from "react";
import RecipeForm from "../components/RecipeForm";
import { useNavigate } from "react-router-dom";

function AddRecipePage() {
  const navigate = useNavigate();

  const handleAdd = async (newRecipe) => {
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
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

