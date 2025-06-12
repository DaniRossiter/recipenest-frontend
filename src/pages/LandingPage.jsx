import React from "react";

function LandingPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to RecipeNest!</h1>
      <p style={styles.subtitle}>
        From comfort food to creative flair. Store, share, and explore your favorite recipes.
      </p>
      <div style={styles.buttons}>
        <a href="/recipes" className="primary-button">Browse Recipes</a>
        <a href="/login" className="outline-button">Login</a>
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
    color: "white"
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    color: "white"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem"
  }
};

export default LandingPage;

