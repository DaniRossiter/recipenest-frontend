import React, { useState } from "react";
import "./RecipeFormResponsive.css"; // Keeps responsive tweaks if needed

function RecipeForm({ onSubmit, initialData = {}, buttonLabel }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [ingredients, setIngredients] = useState(initialData.ingredients?.join(", ") || "");
  const [instructions, setInstructions] = useState(initialData.instructions?.join("\n") || "");
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      ingredients: ingredients.split(",").map(item => item.trim()),
      instructions: instructions.split("\n").map(step => step.trim()),
      imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form} className="recipe-form">
      <label style={styles.label}>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={styles.input}
          className="form-input"
        />
      </label>

      <label style={styles.label}>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={styles.textarea}
          className="form-textarea"
        />
      </label>

      <label style={styles.label}>
        Ingredients
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (comma-separated)"
          style={styles.textarea}
          className="form-textarea"
        />
      </label>

      <label style={styles.label}>
        Instructions
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions"
          style={styles.textarea}
          className="form-textarea"
        />
      </label>

      <label style={styles.label}>
        Image URL
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (optional)"
          style={styles.input}
          className="form-input"
        />
      </label>

      <button
        type="submit"
        style={isHovered ? styles.buttonHover : styles.button}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="form-button"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "600px",
    margin: "2rem auto",
  },
  label: {
    fontWeight: "bold",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "2px solid #54cc86",
    backgroundColor: "#f0f0f0",
  },
  textarea: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "2px solid #54cc86",
    backgroundColor: "#f0f0f0",
    minHeight: "100px",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    backgroundColor: "#0077cc",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  },
  buttonHover: {
    padding: "0.75rem",
    borderRadius: "8px",
    backgroundColor: "#54cc86",
    color: "black",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    transform: "scale(1.02)",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  },
};

export default RecipeForm;




