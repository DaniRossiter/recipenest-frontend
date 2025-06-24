import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";
import "./NavbarResponsive.css";

function Navbar({ searchTerm, setSearchTerm }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // NEW: Hamburger toggle state

  const placeholderText =
    location.pathname === "/my-recipes" ? "Search my recipes..." : "Search recipes...";

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (location.pathname !== "/my-recipes") {
      navigate(`/recipes?q=${encodeURIComponent(term.trim())}`);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/");
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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

       
        <button
          className="hamburger-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>


        <ul className={`nav-links ${isMenuOpen ? "show" : "hide"}`}>
          <li>
            <NavLink
              to="/"
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recipes"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-recipes"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            My Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-recipe"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Add Recipe
          </NavLink>
        </li>

  {isAuthenticated ? (
    <li>
      <span
        className="nav-link"
        onClick={() => {
          handleLogoutClick();
          setIsMenuOpen(false);
        }}
        style={{ cursor: "pointer" }}
      >
        Logout
      </span>
    </li>
  ) : (
    <li>
      <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
        Login
      </Link>
    </li>
  )}
</ul>

      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        message="Are you sure you want to log out?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
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



