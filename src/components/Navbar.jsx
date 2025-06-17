import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search for:", searchTerm);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoWrapper}>
          <img src={logo} alt="RecipeNest logo" style={styles.logoImage} />
        </Link>

        <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </form>

        <div style={styles.spacer}></div>

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
    height: "60px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    height: "100%",
    gap: "1rem",
  },
  logoWrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logoImage: {
    height: "400%",
    objectFit: "contain",
  },
  searchForm: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    marginLeft: "2.5rem",
  },
  spacer: {
    flex: 1,
  },
  searchInput: {
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "300px",
    transition: "all 0.2s ease-in-out",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "2rem",
    margin: 0,
    padding: 0,
  },
};

export default Navbar;

