import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use login function from context

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return setError("Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.");
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register.");
      }

      login(data.token, data.user.username); 
      navigate("/recipes");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
        alt="register"
        style={{ width: "50px", marginBottom: "1rem" }}
      />
      <h1 style={styles.heading}>Create Your Account</h1>
      <p style={styles.subtext}>Join RecipeNest and start saving your favorites!</p>

      <form style={styles.form} onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={{ color: "salmon", marginTop: "-0.5rem" }}>{error}</p>}

        <button
          type="submit"
          style={{ ...styles.button }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = "#0077cc";
            e.target.style.color = "white";
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = "#54cc86";
            e.target.style.color = "black";
          }}
        >
          Register
        </button>
      </form>

      <p style={styles.loginPrompt}>
        Already have an account?{" "}
        <a href="/login" className="register-link">Login</a>
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
  button: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#54cc86",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
  },
  loginPrompt: {
    marginTop: "1.5rem",
    fontSize: "0.95rem",
    color: "#555",
  }
};

export default RegisterPage;