"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center py-20 bg-gradient-to-br from-[#1a1a1a] via-[#333333] to-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path/to/your/image.jpg')] bg-cover bg-center opacity-20"></div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white relative z-10">
          Bienvenido a <span className="text-[#f94510]">Valka</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl relative z-10">
          Descubre rutinas personalizadas, desbloquea desafíos y transforma tu
          vida a través del ejercicio.
        </p>

        <Link href="./pages/routines/">
          <button className="mt-8 px-6 py-3 bg-[#f94510] text-white rounded-lg font-semibold hover:bg-[#f73e00] transition-colors duration-300 relative z-10">
            Explorar Ejercicios
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-5  px-4 text-center bg-[#1a1a1a] border-t border-gray-700">
        <p className="text-gray-400 text-sm md:text-base font-light">
          © 2025 Valka. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
