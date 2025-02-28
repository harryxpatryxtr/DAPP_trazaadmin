import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<{ user_created: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(!!localStorage.getItem("token"));
    }
  }, []);

  const login = (userData: { user_created: string }) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return { user, isAuthenticated, login, logout };
};
