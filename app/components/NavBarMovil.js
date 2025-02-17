"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Importar useRouter para la navegación
import { Home, CalendarToday, Search, Person } from "@mui/icons-material"; // Iconos de Material-UI
import "../styles/footerMovil.css";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="nav">
      <button className="nav-button" onClick={handleBack}>
        <Home className="nav-icon" />
        <span>Volver</span>
      </button>
      <Link href={"../routines"}>
        <button className="nav-button">
          <CalendarToday className="nav-icon" />{" "}
          {/* Icono de calendario para Rutinas */}
          <span>Rutinas</span>
        </button>
      </Link>
      <button className="nav-button">
        <Search className="nav-icon" /> {/* Icono de búsqueda para Buscar */}
        <span>Buscar</span>
      </button>
      <Link href={"../profile"}>
        <button className="nav-button">
          <Person className="nav-icon" /> {/* Icono de perfil para Perfil */}
          <span>Perfil</span>
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
