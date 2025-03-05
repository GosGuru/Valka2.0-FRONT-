"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import { ENV } from "@/app/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { bebasNeue, Exo2, lexendDeca } from "../../ui/fonts";

// Definición de interfaces para la respuesta del servidor
interface RegisterResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface ErrorResponse {
  message: string[];
}

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();
  const { theme } = useTheme();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const data: RegisterResponse | ErrorResponse = await response.json();

      if (response.ok) {
        login((data as RegisterResponse).jwt, (data as RegisterResponse).user);
        setMessage("¡Registro exitoso! Bienvenido a Valka.");
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage(
          (data as ErrorResponse).message[0] ||
            "Error al registrarse. Por favor, intenta nuevamente."
        );
      }
    } catch (error) {
      setMessage("Error del servidor. Por favor, intenta más tarde.");
    }
  };

  return (
    <div
      className={`flex items-start justify-center min-h-screen pt-20 ${
        theme === "dark"
          ? "bg-[hsl(var(--background))]"
          : "bg-[hsl(var(--background))]"
      } text-[hsl(var(--foreground))] relative overflow-hidden`}
    >
      {/* Fondo con patrón geométrico */}
      <div
        className={`absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-20 ${
          theme === "dark" ? "filter grayscale" : ""
        } z-0`}
      ></div>
      {/* margin-top: -40px;
  padding-top: 0; */}
      {/* Contenido del formulario */}
      <form
        onSubmit={handleRegister}
        className={`relative z-10 p-8 rounded-lg shadow-lg w-full max-w-md bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] pt-0 mt-[-40px]`}
      >
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 ${bebasNeue.className} text-[var(--primary-color)]`}
        >
          Registrarse
        </h2>
        <p
          className={`text-lg text-center mb-6 ${lexendDeca.className} ${
            theme === "dark"
              ? "text-[hsl(var(--text-dark))]"
              : "text-[hsl(var(--text-light))]"
          }`}
        >
          Crea tu cuenta y comienza tu transformación física hoy mismo.
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
          <label htmlFor="username" className="block mb-2 text-sm font-medium">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-3 rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--text-light))] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--text-light))] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 text-[.9rem]  rounded-lg font-semibold transition-colors duration-300 bg-[var(--primary-color)] text-[hsl(var(--text-light))] hover:bg-[var(--primary-hover)] ${Exo2.className}`}
        >
          Registrarse
        </button>
        <p className="mt-4 text-center text-xs">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/join/loginForm"
            className={` text-[var(--primary-color)] hover:underline transition-colors duration-300 hover:text-[var(--primary-hover)] ${lexendDeca.className}`}
          >
            Inicia Sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
