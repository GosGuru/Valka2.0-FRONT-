"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext"; // Usa el contexto de autenticación
import { ENV } from "@/app/utils";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // Para mostrar mensajes
  const [isSuccess, setIsSuccess] = useState(false); // Éxito o error
  const router = useRouter();
  const { login } = useAuth(); // Usa la función `login` del contexto

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${ENV.API_BASE_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Llama a la función `login` del contexto con el token y los datos del usuario
        login(data.jwt, data.user);
        setMessage("Registro exitoso. ¡Bienvenido!");
        router.push("/");
      } else {
        setMessage(
          data.message[0].messages[0].message ||
            "Error al registrarse. Intenta nuevamente."
        );
      }
    } catch (error) {
      setMessage("Error del servidor. Por favor, intenta más tarde.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] text-white">
      <form
        onSubmit={handleRegister}
        className="bg-[#222222] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>
        {message && (
          <div
            className={`p-3 mb-4 text-center rounded-lg ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#f94510]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#f94510]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#f94510]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#f94510] rounded-lg font-semibold hover:bg-[#f73e00] transition-colors duration-300"
        >
          Registrarse
        </button>
        <p className="mt-4 text-center text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a href="/join/loginForm" className="text-[#f94510] hover:underline">
            Inicia Sesión
          </a>
        </p>
      </form>
    </div>
  );
}
