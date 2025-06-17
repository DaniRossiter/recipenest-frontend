import React from "react";
import RecipeForm from "../components/RecipeForm";

function AddRecipePage() {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white", marginTop: "3rem" }}>
        Add a New Recipe
      </h1>
      <RecipeForm
        onSubmit={(data) => {
          console.log("Submit new recipe:", data);
        }}
        buttonLabel="Add Recipe"
      />
    </div>
  );
}

export default AddRecipePage;
