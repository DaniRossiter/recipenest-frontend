import React from "react";
import { Link } from "react-router-dom";

function MyRecipesPage() {
  const myRecipes = [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      description: "A classic Italian dish with tomato and beef sauce.",
    }
    // Leave empty to test conditional rendering
    // []
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Recipes</h1>
      <p style={styles.subtext}>These are all the recipes you’ve added.</p>

      <input
        type="text"
        placeholder="Search My Recipes..."
        style={styles.searchBar}
      />

      {myRecipes.length === 0 ? (
        <p style={styles.noRecipes}>You haven't added any recipes yet.</p>
      ) : (
        <div style={styles.grid}>
          {myRecipes.map((recipe) => (
            <div key={recipe.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{recipe.title}</h3>
              <p style={styles.cardDesc}>{recipe.description}</p>
              <div style={styles.buttonRow}>
                <Link to={`/recipes/${recipe.id}`} className="recipe-btn view-btn">View</Link>
<Link to={`/edit/${recipe.id}`} className="recipe-btn edit-btn">Edit</Link>
<button className="recipe-btn delete-btn">Delete</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "4rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    color: "#fff"
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    color: "#ffffff"
  },
  subtext: {
    marginBottom: "2rem",
    fontSize: "1.1rem",
    color: "#ccc"
  },
  searchBar: {
    padding: "0.75rem",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "2rem"
  },
  noRecipes: {
    fontStyle: "italic",
    color: "#888"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem"
  },
  card: {
    backgroundColor: "#333",
    borderLeft: "4px solid #54cc86", // GREEN ACCENT STRIPE
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
  },
  cardTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.25rem",
    color: "#ffffff"
  },
  cardDesc: {
    fontSize: "0.95rem",
    color: "#ccc",
    marginBottom: "1rem"
  },
  buttonRow: {
    display: "flex",
    gap: "1rem"
  },
  viewBtn: {
    backgroundColor: "#0077cc",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    textDecoration: "none"
  },
  editBtn: {
    backgroundColor: "#54cc86", // GREEN
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    textDecoration: "none"
  },
  deleteBtn: {
    backgroundColor: "#cc4444",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  }
};

export default MyRecipesPage;

