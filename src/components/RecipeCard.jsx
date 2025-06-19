import React from "react";
import "../pages/RecipeListResponsive.css"; // For consistent styling

function RecipeCard({ recipe, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="recipe-card"
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {})
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {recipe.title}
    </div>
  );
}

const styles = {
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
    border: "1px solid #54cc86",
  }
};

export default RecipeCard;
