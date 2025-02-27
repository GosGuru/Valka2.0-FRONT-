"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Exo2, zain, lexendDeca, bebasNeue } from "./ui/fonts";
export default function Home() {
  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center py-20 bg-gradient-to-br from-[#1a1a1a] via-[#333333] to-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path/to/your/image.jpg')] bg-cover bg-center opacity-20"></div>
        <h2
          className={`text-5xl md:text-6xl font-bold mb-6 text-white relative z-10 ${Exo2.className}`}
        >
          Bienvenido a <span className="text-[#f94510]">Valka</span>
        </h2>
        <p
          className={`text-lg md:text-xl text-gray-300 max-w-2xl relative z-10 ${lexendDeca.className}`}
        >
          Descubre rutinas personalizadas, desbloquea desafíos y transforma tu
          vida a través del ejercicio.
        </p>

        <Link href="./pages/routines/">
          <button
            className={`mt-5 px-6 py-3 bg-[#f94510] text-lgs text-white rounded-lg  hover:bg-[#f73e00] transition-colors duration-300 relative z-10 ${Exo2.className}`}
          >
            Explorar Ejercicios
          </button>
        </Link>
      </section>
    </div>
  );
}
