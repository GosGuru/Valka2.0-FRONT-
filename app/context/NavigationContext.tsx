import React, { createContext, useState, useContext } from "react";

interface NavigationContextType {
  step: string;
  setStep: (step: string) => void;
  selectedBlock: any;
  setSelectedBlock: (block: any) => void;
}

// Creamos el contexto con valores por defecto
const NavigationContext = createContext<NavigationContextType | null>(null);

// Hook personalizado para consumir el contexto
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation debe usarse dentro de un NavigationProvider");
  }
  return context;
};

// Proveedor del contexto
export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState("list");
  const [selectedBlock, setSelectedBlock] = useState(null);

  return (
    <NavigationContext.Provider value={{ step, setStep, selectedBlock, setSelectedBlock }}>
      {children}
    </NavigationContext.Provider>
  );
};
