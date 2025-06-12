import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h2 style={styles.logo}>RecipeNest</h2>
        <ul style={styles.navLinks}>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
            <li><Link to="/add-recipe" className="nav-link">Add Recipe</Link></li>
            <li><Link to="/login" className="nav-link">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    width: "100%",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    margin: 0,
    fontSize: "1.75rem",
    color: "#333",
    fontWeight: "bold"
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "2rem",
    margin: 0,
    padding: 0
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "color 0.2s",
  }
};

export default Navbar;
