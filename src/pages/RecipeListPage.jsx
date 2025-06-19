import React, { useState, useEffect } from "react";
import "./RecipeListResponsive.css";

function RecipeListPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
  const fetchRecipes = async () => {
    setLoading(true);      // Start loading
    setError(null);        // Clear previous errors

    try {
      const res = await fetch("http://localhost:5000/api/recipes");

      if (!res.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
      setError(err.message);
    } finally {
      setLoading(false);   // Done loading (whether success or error)
    }
  };

  fetchRecipes();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", color: "#ccc" }}>Loading recipes...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "salmon" }}>Error: {error}</p>;
  }

  return (
    <div style={styles.container} className="recipe-list-container">
      <h1 style={styles.heading}>All Recipes</h1>
      <p style={styles.subtext}>Browse delicious creations shared by our community.</p>

      <div style={styles.grid} className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id || index}
            style={{
              ...styles.card,
              ...(hoveredIndex === index ? styles.cardHover : {})
            }}
            className="recipe-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {recipe.title}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "4rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    color: "#ffffff",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#ffffff",
    textAlign: "center"
  },
  subtext: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#dddddd",
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
    fontWeight: "500",
    color: "#fff",
    backdropFilter: "blur(6px)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
    border: "1px solid transparent",
  },
  cardHover: {
    transform: "translateY(-5px) scale(1.03)",
    boxShadow: "0 8px 30px rgba(84, 204, 134, 0.4)",
    border: "1px solid #54cc86"
  }
};

export default RecipeListPage;


