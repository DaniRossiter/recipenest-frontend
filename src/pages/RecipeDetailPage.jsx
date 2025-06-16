import React from "react";
import { useNavigate } from "react-router-dom";

function RecipeDetailPage() {
  const navigate = useNavigate();

  // Placeholder/mock data
  const recipe = {
    title: "Spaghetti Bolognese",
    description: "A hearty tomato and meat sauce",
    ingredients: ["Spaghetti", "Beef mince", "Onion", "Garlic", "Tomato paste"],
    instructions: [
      "Boil pasta according to package instructions.",
      "Sauté onion and garlic until fragrant.",
      "Add beef and brown.",
      "Stir in tomato paste and simmer.",
      "Combine with drained pasta and serve."
    ],
    imageUrl: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isOwner: true
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{recipe.title}</h1>

      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          style={styles.image}
        />
      )}

      <p style={styles.description}>{recipe.description}</p>

      <h3 style={styles.sectionTitle}>Ingredients</h3>
      <ul style={styles.list}>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 style={styles.sectionTitle}>Instructions</h3>
      <ol style={styles.list}>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div style={styles.buttonContainer}>
        <button className="outline-button" onClick={() => navigate("/recipes")}>Back</button>
        {recipe.isOwner && (
          <>
            <button className="primary-button" onClick={() => navigate("/edit/1")}>Edit</button>
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
    marginBottom: "1rem",
    textAlign: "center",
    color: "#222"
  },
  image: {
    maxWidth: "800px",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    display: "block",
    margin: "0 auto 1.5rem"
  },
  description: {
    fontStyle: "italic",
    marginBottom: "1.5rem",
    textAlign: "center",
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
