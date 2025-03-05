"use client";
import React from "react";
import Link from "next/link";
import { PlayIcon } from "lucide-react"; // Importa el ícono de Play
import { Exo2, lexendDeca } from "./ui/fonts"; // Fuentes personalizadas
import { useTheme } from "next-themes"; // Para manejar el tema

export default function Home() {
  const { theme } = useTheme(); // Obtén el tema actual

  return (
    <div
      className={`min-h-full flex flex-col justify-between ${
        theme === "dark"
          ? "bg-[var(--background-dark)]"
          : "bg-[var(--background-light)]"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`relative min-h-screen flex flex-col items-center justify-center text-center py-10 px-4 overflow-hidden`}
      >
        {/* Nuevo fondo con patrón geométrico */}
        <div
          className={`absolute inset-0 bg-[url('/path/to/subtle-pattern.png')] bg-repeat opacity-20 ${
            theme === "dark" ? "filter grayscale" : ""
          }`}
        ></div>

        {/* Overlay de color sólido */}
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-[var(--background-dark)]"
              : "bg-[var(--background-light)]"
          } mix-blend-multiply`}
        ></div>

        {/* Contenido Principal */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2
            className={`text-5xl md:text-7xl font-bold mb-6 ${
              theme === "dark"
                ? "text-[var(--text-dark)]"
                : "text-[var(--text-light)]"
            } ${Exo2.className}`}
          >
            Bienvenido a{" "}
            <span className="text-[var(--primary-color)]">Valka</span>
          </h2>
          <p
            className={`text-xl md:text-2xl ${
              theme === "dark"
                ? "text-[var(--text-dark)]"
                : "text-[var(--text-light)]"
            } mb-10 ${lexendDeca.className}`}
          >
            Tu progreso te espera. Inicia sesión para acceder a tu rutina y
            seguir avanzando hacia tus objetivos.
          </p>
          <p
            className={`text-xs md:text-1xl ${
              theme === "dark"
                ? "text-[var(--text-dark)]"
                : "text-[var(--text-light)]"
            } mb-10 ${lexendDeca.className}`}
          >
            Éxitos en tu rutina!
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col gap-6 justify-center">
            <Link href="./pages/routines/">
              <button
                className={`px-8 py-4 bg-[var(--primary-color)] text-xl text-[var(--text-light)] rounded-lg hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-md ${Exo2.className}`}
              >
                Explorar Ejercicios
              </button>
            </Link>
          </div>

          {/* Opción para usuarios registrados */}
          <p
            className={`mt-10 text-lg ${
              theme === "dark"
                ? "text-[var(--text-dark)]"
                : "text-[var(--text-light)]"
            }`}
          >
            ¿Ya tienes cuenta?
            <a
              href="./join/loginForm"
              className="text-[var(--primary-color)] underline ml-2 hover:text-[var(--primary-hover)] transition-colors duration-300"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
