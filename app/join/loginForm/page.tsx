"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext"; // Usa el contexto de autenticación
import { ENV } from "@/app/utils";
import { useTheme } from "next-themes"; // Para manejar el tema
import Link from "next/link";
import { bebasNeue, Exo2, lexendDeca } from "../../ui/fonts"; // Importa las fuentes

// Definición de interfaces para la respuesta del servidor
interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    fotoPerfil?: string; // Campo opcional
  };
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth(); // Usa la función `login` del contexto
  const { theme } = useTheme(); // Obtén el tema actual

  // Manejador de inicio de sesión
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ENV.API_BASE_URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });

      const data: AuthResponse | ErrorResponse = await response.json();

      if (response.ok) {
        login((data as AuthResponse).jwt, (data as AuthResponse).user);
        setMessage("¡Inicio de sesión exitoso! Redirigiendo...");
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage(
          (data as ErrorResponse).error.message ||
            "Credenciales incorrectas. Intenta de nuevo."
        );
      }
    } catch (error) {
      setMessage("Error del servidor. Por favor, intenta más tarde.");
    }
  };

  return (
    <div
      className={`flex items-start justify-center min-h-screen pt-20 ${
        theme === "dark" ? "bg-[hsl(var(--background))]" : "bg-[hsl(var(--background))]"
      } text-[hsl(var(--foreground))] relative overflow-hidden`}
    >
      {/* Fondo con patrón geométrico */}
      <div
        className={`absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-20 ${
          theme === "dark" ? "filter grayscale" : ""
        } z-0`}
      ></div>

      {/* Contenido del formulario */}
      <form
        onSubmit={handleLogin}
        className={`relative z-10 p-8 rounded-lg shadow-lg w-full max-w-md bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] pt-0 mt-[-40px]`}
      >
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
            bebasNeue.className
          } text-[var(--primary-color)]`}
        >
          Iniciar Sesión
        </h2>
        <p
          className={`text-lg text-center mb-6 ${lexendDeca.className} ${
            theme === "dark" ? "text-[hsl(var(--text-dark))]" : "text-[hsl(var(--text-light))]"
          }`}
        >
          Accede a tu cuenta y continúa tu progreso.
        </p>
        {message && (
          <div
            className={`p-3 mb-4 text-center rounded-lg ${
              isSuccess
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                : "bg-gradient-to-r from-red-500 to-red-700 text-white"
            }`}
          >
            {message}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={`w-full p-3 rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--text-light))] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className={`w-full p-3 rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--text-light))] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3  text-[.9rem] rounded-lg font-semibold transition-colors duration-300 bg-[var(--primary-color)] text-[hsl(var(--text-light))] hover:bg-[var(--primary-hover)] ${Exo2.className}`}
        >
          Iniciar Sesión
        </button>
        <p className="mt-4 text-center text-xs">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/join/registerForm"
            className={`text-[var(--primary-color)] hover:underline transition-colors duration-300 hover:text-[var(--primary-hover)] ${lexendDeca.className}`}
          >
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}