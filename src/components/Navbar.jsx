import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import "./NavbarResponsive.css";

function Navbar({ searchTerm, setSearchTerm }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const placeholderText =
    location.pathname === "/my-recipes" ? "Search my recipes..." : "Search recipes...";

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Only navigate if not already on /my-recipes (which filters locally)
    if (location.pathname !== "/my-recipes") {
      navigate(`/recipes?q=${encodeURIComponent(term.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={navStyle}>
      <div className="navbar-container">
        <Link to="/" className="logo-wrapper">
          <img src={logo} alt="RecipeNest logo" className="logo-image" />
        </Link>

        <form onSubmit={(e) => e.preventDefault()} className="search-form">
          <input
            type="text"
            placeholder={placeholderText}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </form>

        <div className="spacer" />

        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
          <li><Link to="/my-recipes" className="nav-link">My Recipes</Link></li>
          <li><Link to="/add-recipe" className="nav-link">Add Recipe</Link></li>

          {isAuthenticated ? (
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


