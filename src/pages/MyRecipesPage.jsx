import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

function MyRecipesPage({ searchTerm }) {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
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
        const API_BASE = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${API_BASE}/recipes/mine`, {
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

  const handleDeleteClick = (id) => {
    setRecipeToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE}/recipes/${recipeToDelete}`, {
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

      setMyRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeToDelete));
      setRecipeToDelete(null);
      setShowConfirmModal(false);
      alert("Recipe deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setRecipeToDelete(null);
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
      ) : myRecipes.length === 0 ? (
        <p style={styles.noRecipes}>You haven't added any recipes yet.</p>
      ) : filteredMyRecipes.length === 0 ? (
        <p style={styles.noRecipes}>No recipes match your search.</p>
      ) : (
        <div style={styles.grid}>
          {filteredMyRecipes.map((recipe) => (
            <div key={recipe.id} style={styles.card}>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{recipe.title}</h3>
                <p style={styles.cardDesc}>{recipe.description}</p>
              </div>
              <div style={styles.buttonRow}>
                <Link to={`/recipes/${recipe.id}`} className="recipe-btn view-btn">View</Link>
                <Link to={`/recipes/${recipe.id}/edit`} className="recipe-btn edit-btn">Edit</Link>
                <button
                  className="recipe-btn delete-btn"
                  onClick={() => handleDeleteClick(recipe.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirmModal}
        message="Are you sure you want to delete this recipe?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
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
    gap: "2rem",
    alignItems: "stretch"
  },
  card: {
    backgroundColor: "#333",
    borderLeft: "4px solid #54cc86",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cardContent: {
    marginBottom: "1rem"
  },
  cardTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.25rem",
    color: "#ffffff"
  },
  cardDesc: {
    fontSize: "0.95rem",
    color: "#ccc",
    marginBottom: "1rem",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  buttonRow: {
    display: "flex",
    gap: "1rem"
  },
};

export default MyRecipesPage;