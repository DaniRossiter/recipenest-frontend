import React from "react";
import RecipeForm from "../components/RecipeForm";
import { useParams } from "react-router-dom";

function EditRecipePage() {
  const { id } = useParams();

  const handleUpdate = (updatedRecipe) => {
    console.log("Update this recipe in backend:", id, updatedRecipe);
    // TODO: send PUT request
  };

  const mockRecipe = {
    title: "Mock title",
    description: "Mock description for this recipe"
  };

  return (
    <div>
        <h1 style={{ textAlign: "center", marginTop: "2rem", color: "#ffffff" }}>
            Edit Recipe
        </h1>

        <RecipeForm
            onSubmit={handleUpdate}
            initialData={mockRecipe}
            buttonLabel="Update Recipe"
        />
    </div>
  );
}

export default EditRecipePage;
