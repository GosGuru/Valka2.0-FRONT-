"use client";
import { createContext, useState, useEffect, useContext } from "react";

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
      {!loading ? (
        children
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] text-white">
          <div className="text-center">
            {/* Icono (puedes usar un ícono personalizado o uno de Material-UI) */}
            <svg
              className="animate-spin h-12 w-12 mx-auto mb-4 text-[#f94510]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            {/* Texto sutil debajo del icono */}
            <p className="text-gray-400 text-sm">Cargando...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
