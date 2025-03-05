"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getExerciseBlocks } from "../../api/getExerciseBlocks";
import BlockList from "../../components/BlockList";
import BlockDetail from "../../components/BlockDetail";
import PreBlockDetail from "../../components/PreBlockDetail";
import "../../scss/Routine/routine.scss";
import Link from "next/link";
import { bebasNeue } from "../../ui/fonts";
import { useTheme } from "next-themes";
import { ClassNames } from "@emotion/react";
interface Block {
  id: number;
  name: string;
  exercises: string[];
}

const RoutinePage: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [step, setStep] = useState("list"); // "list", "pre-detail", "detail"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulación de autenticación

  useEffect(() => {
    document.body.classList.add("hide-footer");
    return () => {
      document.body.classList.remove("hide-footer"); // Limpia la clase al salir
    };
  }, []);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        // Simulación de verificación de autenticación
        const userIsLoggedIn = checkIfUserIsLoggedIn();
        setIsLoggedIn(userIsLoggedIn);

        if (userIsLoggedIn) {
          const data = await getExerciseBlocks();
          setBlocks(data);
        }
      } catch (error) {
        console.error("Error al obtener los bloques:", error);
      }
    };
    fetchBlocks();
  }, []);

  const checkIfUserIsLoggedIn = (): boolean => {
    // Simula la verificación de autenticación (puedes reemplazar esto con tu lógica real)
    return !!localStorage.getItem("authToken"); // Ejemplo: verifica si existe un token en localStorage
  };

  const handleSelectBlock = (blockId: number) => {
    const selected = blocks.find((block) => block.id === blockId);
    setSelectedBlock(selected || null);
    setStep("pre-detail");
  };

  const handleBackToPreDetail = () => {
    setStep("pre-detail");
  };

  const handleGoToDetail = () => {
    setStep("detail");
  };

  const handleBackToList = () => {
    setSelectedBlock(null);
    setStep("list");
  };
  const { theme } = useTheme();
  return (
    <div
      className={`routine-page ${
        theme === "dark" ? "bg-[#0C0207] text-orange-400" : "bg-white"
      }`}
    >
      <AnimatePresence mode="wait">
        {/* Estado cuando el usuario no está logueado */}
        {!isLoggedIn && (
          <motion.div
            key="not-logged-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="empty-state"
          >
            <div className="logo-container">
              <img
                src="/logo.png" // Reemplaza con la ruta de tu logo
                alt="Logo de Valka"
                className="logo"
              />
            </div>
            <h2 className="empty-title">¡Bienvenido a Valka!</h2>
            <p className="empty-description">
              Por favor, inicia sesión para ver tus rutinas personalizadas.
            </p>
            <Link
              href={"../../join/loginForm"}
              className={`${
                bebasNeue.className
              } text-2xl mt-5 py-2 px-6 rounded-sm ${
                theme === "dark"
                  ? "bg-[#0C0207] text-orange-400"
                  : "text-[var(--text-light)]"
              }`}
            >
              Ingresar
            </Link>
          </motion.div>
        )}

        {/* Estado cuando el usuario está logueado pero no hay bloques */}
        {isLoggedIn && blocks.length === 0 && step === "list" && (
          <motion.div
            key="no-blocks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="empty-state"
          >
            <h2 className="empty-title">No tienes rutinas asignadas</h2>
            <p className="empty-description">
              Parece que aún no tienes ejercicios asignados. ¡Contacta a tu
              entrenador!
            </p>
          </motion.div>
        )}

        {/* Renderiza la lista de bloques si hay datos */}
        {isLoggedIn && step === "list" && blocks.length > 0 && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BlockList blocks={blocks} onSelectBlock={handleSelectBlock} />
          </motion.div>
        )}

        {isLoggedIn && step === "pre-detail" && selectedBlock && (
          <motion.div
            key="pre-detail"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 5, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PreBlockDetail
              block={selectedBlock}
              onBack={handleBackToList}
              onNext={handleGoToDetail}
            />
          </motion.div>
        )}

        {isLoggedIn && step === "detail" && selectedBlock && (
          <motion.div
            key="detail"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 5, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BlockDetail block={selectedBlock} onBack={handleBackToPreDetail} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoutinePage;
