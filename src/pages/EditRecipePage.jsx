import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { AuthContext } from "../context/AuthContext";

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes/${id}`);
        if (!response.ok) throw new Error("Failed to fetch recipe");

        const data = await response.json();
        setInitialData({
          title: data.title,
          description: data.description,
          ingredients: data.ingredients,
          instructions: data.instructions,
          imageUrl: data.image_url,
          servings: data.servings,
        });
      } catch (err) {
        console.error(err);
        navigate("/not-found");
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleUpdate = async (updatedRecipe) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update recipe");
      }

      const data = await response.json();
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error("Error updating recipe:", err);
      alert(err.message);
    }
  };

  return (
    <div style={{ marginTop: "4rem" }}>
      {initialData ? (
        <RecipeForm
          initialData={initialData}
          buttonLabel="Update Recipe"
          mode="edit"
          onSubmit={handleUpdate}
        />
      ) : (
        <p style={{ textAlign: "center", color: "white" }}>Loading recipe...</p>
      )}
    </div>
  );
}

export default EditRecipePage;

