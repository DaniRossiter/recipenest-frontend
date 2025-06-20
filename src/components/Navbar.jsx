import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./NavbarResponsive.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search for:", searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
  };

  return (
    <nav style={navStyle}>
      <div className="navbar-container">
        <Link to="/" className="logo-wrapper">
          <img src={logo} alt="RecipeNest logo" className="logo-image" />
        </Link>

        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </form>

        <div className="spacer" />

        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
          <li><Link to="/add-recipe" className="nav-link">Add Recipe</Link></li>

          {username ? (
            <li>
              <span
                className="nav-link"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </li>
          ) : (
            <li><Link to="/login" className="nav-link">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

const navStyle = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e0e0e0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  width: "100%",
};

export default Navbar;
