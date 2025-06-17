import React from "react";
import RecipeForm from "../components/RecipeForm";

function EditRecipePage() {
  const mockRecipe = {
    title: "Mock title",
    description: "Mock description for this recipe",
    ingredients: ["Mock ingredient 1", "Mock ingredient 2"],
    instructions: ["Mock step 1", "Mock step 2"],
    imageUrl: "https://via.placeholder.com/400x200"
  };

  return (
    <div style={{ marginTop: "4rem" }}>
      <RecipeForm
        initialData={mockRecipe}
        buttonLabel="Update Recipe"
        mode="edit"
        onSubmit={(updatedData) => {
          console.log("Update this recipe with:", updatedData);
        }}
      />
    </div>
  );
}

export default EditRecipePage;
