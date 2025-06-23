import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyRecipesPage({ searchTerm }) {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/recipes/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch recipes.");
        } else {
          setMyRecipes(data);
        }
      } catch (err) {
        setError("Something went wrong while fetching your recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete recipe.");
      }

      setMyRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      alert("Recipe deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredMyRecipes = myRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        {username ? `Welcome back, ${username}!` : "My Recipes"}
      </h1>
      <p style={styles.subtext}>Here are the recipes you've added:</p>

      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {loading ? (
        <p style={styles.noRecipes}>Loading...</p>
      ) : filteredMyRecipes.length === 0 ? (
        <p style={styles.noRecipes}>No recipes match your search.</p>
      ) : (
        <div style={styles.grid}>
          {filteredMyRecipes.map((recipe) => (
            <div key={recipe.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{recipe.title}</h3>
              <p style={styles.cardDesc}>{recipe.description}</p>
              <div style={styles.buttonRow}>
                <Link to={`/recipes/${recipe.id}`} className="recipe-btn view-btn">View</Link>
                <Link to={`/recipes/${recipe.id}/edit`} className="recipe-btn edit-btn">Edit</Link>
                <button
                  className="recipe-btn delete-btn"
                  onClick={() => handleDelete(recipe.id)}
                >
                  Delete
                </button>
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
    borderLeft: "4px solid #54cc86",
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
};

export default MyRecipesPage;
