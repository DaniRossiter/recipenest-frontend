import React, { useState } from "react";

function RecipeForm({ onSubmit, initialData = {}, buttonLabel }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        style={styles.input}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        style={styles.textarea}
      />
      <button
        type="submit"
        style={isHovered ? styles.buttonHover : styles.button}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "120px"
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
    transition: "background-color 0.2s ease, transform 0.2s ease"
  },
  buttonHover: {
    padding: "0.75rem",
    borderRadius: "8px",
    backgroundColor: "#54cc86",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    transform: "scale(1.02)",
    transition: "background-color 0.2s ease, transform 0.2s ease",
    color: "black"
  }
};

export default RecipeForm;
