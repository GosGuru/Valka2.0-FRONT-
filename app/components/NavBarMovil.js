"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, CalendarToday, Search, Person } from "@mui/icons-material";
import Link from "next/link";
import "../styles/footerMovil.scss";
import { useSwipeable } from "react-swipeable";
import { PanelRightOpen, PanelRightClose } from "lucide-react";
const NavBar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleBack = () => {
    router.back();
  };

  // Configuración de detección de gestos
  const handlers = useSwipeable({
    onSwipedLeft: () => setIsOpen(false),
    onSwipedRight: () => setIsOpen(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const toggleNavBar = () => setIsOpen(!isOpen);

  return (
    <div {...handlers}>
      <div className={`nav ${isOpen ? "open" : "closed"}`}>
        <button className="nav-button" onClick={handleBack}>
          <Home className="nav-icon" />
          <span>Volver</span>
        </button>
        <Link href={"../routines"}>
          <button className="nav-button">
            <CalendarToday className="nav-icon" />
            <span>Rutinas</span>
          </button>
        </Link>
        <button className="nav-button">
          <Search className="nav-icon" />
          <span>Buscar</span>
        </button>
        <Link href={"../profile"}>
          <button className="nav-button">
            <Person className="nav-icon" />
            <span>Perfil</span>
          </button>
        </Link>
      </div>
      {/* Botón para mostrar u ocultar el nav */}
      <button className="toggle-button" onClick={toggleNavBar}>
        {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
      </button>
    </div>
  );
};

export default NavBar;
