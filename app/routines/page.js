"use client";
import React, { useState, useEffect } from "react";
import { getExerciseBlocks } from "../api/getExerciseBlocks";
import BlockList from "../components/BlockList";
import BlockDetail from "../components/BlockDetail";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorageHelper";

const RoutinePage = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null); // Declarar el estado para selectedBlock

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        // Cargar rutinas desde localStorage si existen
        const storedBlocks = loadFromLocalStorage("rutinas");
        if (storedBlocks) {
          setBlocks(storedBlocks);
        } else {
          // Obtener rutinas desde la API
          const data = await getExerciseBlocks();
          setBlocks(data);

          // Guardar rutinas en localStorage
          saveToLocalStorage("rutinas", data);
        }
      } catch (error) {
        console.error("Error al obtener o guardar rutinas:", error);
      }
    };

    fetchBlocks();
  }, []);

  const handleSelectBlock = (blockId) => {
    const selected = blocks.find((block) => block.id === blockId);
    setSelectedBlock(selected); // Actualizar el estado con el bloque seleccionado
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-start justify-center">
      {selectedBlock ? (
        <BlockDetail
          block={selectedBlock}
          onBack={() => setSelectedBlock(null)} // Limpiar el bloque seleccionado
        />
      ) : blocks.length > 0 ? (
        <BlockList blocks={blocks} onSelectBlock={handleSelectBlock} />
      ) : (
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto mb-6 text-[#f94510]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-2">
            No tienes rutinas asignadas
          </h2>
          <p className="text-gray-400 text-sm">
            Comunícate con tu entrenador para obtener una rutina personalizada.
          </p>
        </div>
      )}
    </div>
  );
};

export default RoutinePage;
