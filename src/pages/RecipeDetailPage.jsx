import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${API_BASE}/recipes/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch recipe");
        }

        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "salmon" }}>Error: {error}</p>;
  if (!recipe) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{recipe.title}</h1>

      {recipe.servings && (
        <p style={styles.servings}>Serves: {recipe.servings}</p>
      )}

      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title}
          style={styles.image}
        />
      )}

      <div style={styles.contentWrapper}>
        <p style={styles.description}>{recipe.description}</p>

        <h3 style={styles.sectionTitle}>Ingredients</h3>
        <ul style={styles.list}>
          {Array.isArray(recipe.ingredients) ? (
            recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>No ingredients listed.</li>
          )}
        </ul>

        <h3 style={styles.sectionTitle}>Instructions</h3>
        <ol style={styles.list}>
          {Array.isArray(recipe.instructions)
            ? recipe.instructions.map((step, index) => (
              <li key={index}>
                {step.replace(/^\d+\.\s*/, "").trim()}
              </li>
            ))
            : <li>No instructions available.</li>}
        </ol>
      </div>

      <div style={styles.buttonContainer}>
        <button className="outline-button" onClick={() => navigate("/recipes")}>Back</button>
        {recipe.isOwner && (
          <>
            <button className="primary-button" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
            <button className="delete-btn">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "4rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    color: "#333",
    lineHeight: "1.6"
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    textAlign: "center",
    color: "#222"
  },
  servings: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#555",
    marginBottom: "1rem",
    fontStyle: "italic"
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    margin: "1rem auto",
    display: "block"
  },
  contentWrapper: {
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "left"
  },
  description: {
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: "1.25rem",
    marginTop: "1.5rem",
    color: "#0077cc"
  },
  list: {
    paddingLeft: "1.5rem",
    marginBottom: "1.5rem"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "2rem"
  }
};

export default RecipeDetailPage;

