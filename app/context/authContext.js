"use client";
import { createContext, useState, useEffect, useContext } from "react";
import Loading from "../components/Loading";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar el token almacenado en localStorage al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      validateToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Validar el token con la API
  const validateToken = async (token) => {
    try {
      // Aquí puedes agregar una llamada a tu API para validar el token
      setToken(token);
      setUser({ username: "Usuario" }); // Simula datos del usuario
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión
  const login = (newToken, userData) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
