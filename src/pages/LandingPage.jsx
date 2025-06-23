import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LandingPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const username = localStorage.getItem("username");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {isAuthenticated && username
          ? `Welcome back, ${username}!`
          : "Welcome to RecipeNest!"}
      </h1>

      <p style={styles.subtitle}>
        {isAuthenticated
          ? "Start cooking by exploring your recipes or adding something delicious!"
          : "From comfort food to creative flair. Store, share, and explore your favorite recipes."}
      </p>

      <div style={styles.buttons}>
        {isAuthenticated ? (
          <>
            <Link to="/my-recipes" className="primary-button">My Recipes</Link>
            <Link to="/add-recipe" className="outline-button">Add Recipe</Link>
          </>
        ) : (
          <>
            <Link to="/recipes" className="primary-button">Browse Recipes</Link>
            <Link to="/login" className="outline-button">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "4rem 1rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "white",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    color: "white",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
};

export default LandingPage;

