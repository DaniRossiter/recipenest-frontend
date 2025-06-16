import React from "react";

function LoginPage() {
  return (
    <div style={styles.container}>
        <img src="https://static.vecteezy.com/system/resources/previews/004/192/149/non_2x/healthy-meal-with-fresh-vegetable-salad-bowl-free-vector.jpg" alt="logo" style={{ width: "50px", marginBottom: "1rem" }} />
        <h1 style={styles.heading}>Login to RecipeNest</h1>
        <p style={styles.subtext}>Welcome back! Please enter your details.</p>
      
        <form style={styles.form}>
            <input type="email" placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />
            <button type="submit" style={styles.button}>Login</button>
        </form>
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
    inputFocus: {
        borderColor: "#54cc86"
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
        transition: "background-color 0.2s"
    }
};


export default LoginPage;
