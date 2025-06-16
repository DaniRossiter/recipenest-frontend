import React, { useState } from "react";

function AddRecipePage() {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add a New Recipe</h1>
      <form style={styles.form}>
        <input type="text" placeholder="Title" style={styles.input} />
        <textarea placeholder="Description" style={styles.textarea} />
        <textarea placeholder="Ingredients (comma-separated)" style={styles.textarea} />
        <textarea placeholder="Instructions" style={styles.textarea} />
        <input type="text" placeholder="Image URL (optional)" style={styles.input} />
        <button
            style={isHovered ? styles.buttonHover : styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
  Add Recipe
</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "4rem auto",
    padding: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    border: "1px solid #54cc86"
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "white"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "2px solid #54cc86",
    backgroundColor: "#f0f0f0",
    fontSize: "1rem"
  },
  textarea: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "2px solid #54cc86",
    backgroundColor: "#f0f0f0",
    fontSize: "1rem",
    minHeight: "100px"
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    backgroundColor: "#0077cc", // BLUE
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
    backgroundColor: "#54cc86", // GREEN
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


export default AddRecipePage;
