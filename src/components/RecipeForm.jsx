import React, { useState } from "react";
import "./RecipeFormResponsive.css"; 

function RecipeForm({ onSubmit, initialData = {}, buttonLabel }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [ingredients, setIngredients] = useState(initialData.ingredients?.join(", ") || "");
  const [instructions, setInstructions] = useState(initialData.instructions?.join("\n") || "");
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");
  const [servings, setServings] = useState(initialData.servings || "");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      ingredients: ingredients.split(",").map(item => item.trim()),
      instructions: instructions.split("\n").map(step => step.trim()),
      imageUrl,
      servings,
    });
    console.log("Form submitted in RecipeForm with servings:", servings);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form} className="recipe-form">
      <label style={styles.label}>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Spicy Peanut Noodles"
          style={styles.input}
          className="form-input"
        />
      </label>

      <label style={styles.label}>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Creamy, spicy noodles with a peanut twist."
          style={styles.textarea}
          className="form-textarea"
        />
      </label>

      <label style={styles.label}>
        Ingredients <span style={{ fontWeight: "normal" }}>(separate with commas)</span>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g. 1 cup rice, 2 eggs, 1 tbsp soy sauce"
          style={styles.textarea}
          className="form-textarea"
        />
      </label>

      <label style={styles.label}>
        Instructions <span style={{ fontWeight: "normal" }}>(each step on a new line)</span>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder={`e.g.\n1. Boil water\n2. Add pasta\n3. Cook for 10 mins`}
          style={styles.textarea}
          className="form-textarea"
        />
      </label>

      <label style={styles.label}>
        Servings
        <input
          type="number"
          min="1"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          placeholder="e.g. 4"
          style={styles.input}
          className="form-input"
        />
      </label>

      <label style={styles.label}>
        Image URL
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Paste a direct image link (optional)"
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