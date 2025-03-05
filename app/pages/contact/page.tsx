"use client";

import React, { useState } from "react";
import { lexendDeca, bebasNeue, Exo2} from "../../ui/fonts";
import { useTheme } from "next-themes";

export default function Contacto() {
  const [mensaje, setMensaje] = useState("");
  const { theme } = useTheme();

  const enviarWhatsApp = () => {
    const telefonoEntrenador = "59894734367";
    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(
      `https://wa.me/${telefonoEntrenador}?text=${mensajeCodificado}`,
      "_blank"
    );
  };

  return (
    <div
      className={`flex flex-col items-center justify-start min-h-screen p-4 ${
        theme === "dark" ? "bg-black text-gray-300" : "bg-white text-gray-700"
      }`}
    >
      <div
        className={` rounded-lg shadow-md p-8 max-w-md w-full ${
          theme === "dark"
            ? "bg-black border-2 border-[#f97316] text-gray-100"
            : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${Exo2.variable} ${
            theme === "dark" ? "text-[#f6754c]" : "text-orange-500"
          }`}
        >
          ¡Contáctame por WhatsApp!
        </h2>
        <p
          className={`mb-4 ${lexendDeca.variable}
        ${theme === "dark" ? "text-white" : "text-black"} `}
        >
          Escribe tu mensaje y te responderé a la brevedad.
        </p>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className={`w-full p-3 border rounded-md mb-4 ${
            lexendDeca.variable
          } font-sans ${
            theme === "dark"
              ? "bg-gray-1000 text-gray-100 border-gray-700"
              : "bg-white border-gray-400"
          }`}
          rows={4}
        />
        <button
          onClick={enviarWhatsApp}
          className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md ${lexendDeca.variable} font-sans`}
        >
          Enviar mensaje por WhatsApp
        </button>
      </div>
    </div>
  );
}
