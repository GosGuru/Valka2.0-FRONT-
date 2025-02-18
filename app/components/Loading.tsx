"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent text-white">
      <div className="text-center">
        {/* Icono de carga */}
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
        {/* Texto debajo del icono */}
        <p className="text-gray-400 text-sm">Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
