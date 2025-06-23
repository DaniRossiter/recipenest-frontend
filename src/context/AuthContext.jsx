import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setAuthToken(storedToken);
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", user);
    setAuthToken(token);
    setIsAuthenticated(true);
    setUsername(user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuthenticated,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
