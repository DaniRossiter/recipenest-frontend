import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./RecipeListResponsive.css";
import RecipeCard from "../components/RecipeCard";

function RecipeListPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromURL = queryParams.get("q") || "";

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes`);

        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(queryFromURL.toLowerCase())
  );

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
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id || index}
            recipe={recipe}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
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
    textAlign: "center",
  },
  subtext: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#dddddd",
    textAlign: "center",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
  },
};

export default RecipeListPage;




