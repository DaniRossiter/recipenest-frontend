import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn’t exist.</p>
      <div style={styles.buttonContainer}>
        <button className="outline-button" onClick={() => navigate("/")}>
          Go Home
        </button>
        <button className="primary-button" onClick={() => navigate("/recipes")} style={{ marginLeft: "1rem" }}>
          Browse Recipes
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "6rem 2rem",
    color: "#fff",
  },
  code: {
    fontSize: "6rem",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
};

export default NotFoundPage;
