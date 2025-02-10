"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Importar useRouter para la navegación
import { Home, CalendarToday, Search, Person } from "@mui/icons-material"; // Iconos de Material-UI
import "../styles/footerMovil.css";
import Link from "next/link";

const FooterMovil = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="footer">
      <button className="footer-button" onClick={handleBack}>
        <Home className="footer-icon" />
        <span>Volver</span>
      </button>
      <Link href={"../routines"}>
      <button className="footer-button">
        <CalendarToday className="footer-icon" />{" "}
        {/* Icono de calendario para Rutinas */}
        <span>Rutinas</span>
      </button>
      </Link>
      <button className="footer-button">
        <Search className="footer-icon" /> {/* Icono de búsqueda para Buscar */}
        <span>Buscar</span>
      </button>
      <Link href={"../profile"}>
        <button className="footer-button">
          <Person className="footer-icon" /> {/* Icono de perfil para Perfil */}
          <span>Perfil</span>
        </button>
      </Link>
    </div>
  );
};

export default FooterMovil;
