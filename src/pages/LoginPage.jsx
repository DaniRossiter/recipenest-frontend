import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

    // Save token to localStorage
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("username", data.user.username);

    setTimeout(() => {
        navigate("/my-recipes");
    }, 100);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="https://static.vecteezy.com/system/resources/previews/004/192/149/non_2x/healthy-meal-with-fresh-vegetable-salad-bowl-free-vector.jpg"
        alt="logo"
        style={{ width: "50px", marginBottom: "1rem" }}
      />
      <h1 style={styles.heading}>Login to RecipeNest</h1>
      <p style={styles.subtext}>Welcome back! Please enter your details.</p>

      <form style={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <p style={styles.registerPrompt}>
        New here? <a href="/register" className="register-link">Register</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "3rem 1rem",
    maxWidth: "400px",
    margin: "5rem auto",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    color: "#333",
  },
  heading: {
    fontSize: "2.2rem",
    marginBottom: "1rem",
    color: "#222"
  },
  subtext: {
    fontSize: "1rem",
    color: "#555"
  },
  form: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#f9f9f9",
    color: "#333",
    outline: "none",
    transition: "border-color 0.2s ease-in-out",
  },
  registerPrompt: {
    marginTop: "1.5rem",
    fontSize: "0.95rem",
    color: "#555",
  }
};

export default LoginPage;

