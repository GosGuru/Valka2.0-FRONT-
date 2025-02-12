"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getExerciseBlocks } from "../../api/getExerciseBlocks";
import BlockList from "../../components/BlockList";
import BlockDetail from "../../components/BlockDetail";
import PreBlockDetail from "../../components/PreBlockDetail";

const RoutinePage = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [step, setStep] = useState("list"); // "list", "pre-detail", "detail"

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

  const handleSelectBlock = (blockId) => {
    const selected = blocks.find((block) => block.id === blockId);
    setSelectedBlock(selected);
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
        {/* Animación para BlockList */}
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

        {/* Animación para PreBlockDetail */}
        {step === "pre-detail" && selectedBlock && (
          <motion.div
            key="pre-detail"
            initial={{ x: "-100%", opacity: 0 }}
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

        {/* Animación para BlockDetail */}
        {step === "detail" && selectedBlock && (
          <motion.div
            key="detail"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
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
