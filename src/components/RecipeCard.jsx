import React from "react";
import "../pages/RecipeListResponsive.css";
import { Link } from "react-router-dom";
import placeholderImage from "../assets/no-image-placeholder.png";

function RecipeCard({ recipe, isHovered, onMouseEnter, onMouseLeave }) {
  const { title, image_url } = recipe;

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      style={{ textDecoration: "none" }}
    >
      <div
        className="recipe-card"
        style={{
          ...styles.card,
          ...(isHovered ? styles.cardHover : {})
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div style={styles.imageWrapper}>
          <img
            src={image_url || placeholderImage}
            alt={title}
            style={styles.image}
          />
        </div>
        <h3 style={styles.title}>{title}</h3>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
    fontWeight: "500",
    color: "#fff",
    backdropFilter: "blur(6px)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
    border: "1px solid transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "280px",
    maxWidth: "100%",
    justifyContent: "flex-start",
  },

  cardHover: {
    transform: "translateY(-5px) scale(1.03)",
    boxShadow: "0 8px 30px rgba(84, 204, 134, 0.4)",
    border: "1px solid #54cc86",
  },

  imageWrapper: {
    width: "100%",
    height: "190px",
    overflow: "hidden",
    borderRadius: "8px",
    marginBottom: "0.3rem", // tighter gap
  },

  image: {
    width: "100%",
    height: "180px",         // Aligned image heights
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "0.2rem",  // Tight space to title
  },

  title: {
    fontSize: "1rem",
    color: "#fff",
    marginTop: "auto",        // Push title to bottom if image height expands
    marginBottom: "0",        // Prevent extra bottom gap
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  },
};

export default RecipeCard;


