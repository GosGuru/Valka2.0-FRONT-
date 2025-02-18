"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getExerciseBlocks } from "../../api/getExerciseBlocks";
import BlockList from "../../components/BlockList";
import BlockDetail from "../../components/BlockDetail";
import PreBlockDetail from "../../components/PreBlockDetail";

interface Block {
  id: number;
  name: string;
  exercises: string[];
}

const RoutinePage: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [step, setStep] = useState("list"); // "list", "pre-detail", "detail"

  useEffect(() => {
    document.body.classList.add("hide-footer");
    return () => {
      document.body.classList.remove("hide-footer"); // Limpia la clase al salir
    };
  }, []);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const data = await getExerciseBlocks();
        setBlocks(data);
      } catch (error) {
        console.error("Error al obtener los bloques:", error);
      }
    };
    fetchBlocks();
  }, []);

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

  return (
    <div className="routine-page">
      <AnimatePresence mode="wait">
        {step === "list" && (
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
        {step === "pre-detail" && selectedBlock && (
          <motion.div
            key="pre-detail"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PreBlockDetail
              block={selectedBlock}
              onBack={handleBackToList}
              onNext={handleGoToDetail}
            />
          </motion.div>
        )}
        {step === "detail" && selectedBlock && (
          <motion.div
            key="detail"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
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
