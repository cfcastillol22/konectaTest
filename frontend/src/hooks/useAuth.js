import { useState, useEffect, useCallback } from "react";
import { login as loginService } from "../services/authService";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const userData = await loginService(credentials);
      setUser(userData.data.user);
      localStorage.setItem("user", JSON.stringify(userData.data.user));
      localStorage.setItem("token", userData.data.accessToken);
      return true;
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
