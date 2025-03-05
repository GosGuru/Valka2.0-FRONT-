import React from "react";
import "../scss/Footer/footer.scss"; // Importa los estilos SCSS
import {
  bebasNeue,
  robotoSlab,
  openSans,
  Exo2,
  zain,
  lexendDeca,
} from "../ui/fonts";

const Footer = () => {
  return (
    <footer className={`footer ${bebasNeue.variable} ${openSans.variable}`}>
      <div className="footer-container">
        {/* Sección de información */}
        <div className="footer-section">
          <h3 className="footer-title">Sobre Nosotros</h3>
          <p className="footer-description">
            Somos una plataforma dedicada a ayudarte a alcanzar tus objetivos de
            fitness. ¡Únete a nuestra comunidad hoy!
          </p>
        </div>

        {/* Sección de enlaces rápidos */}
        <div className="footer-section">
          <h3 className="footer-title">Enlaces Rápidos</h3>
          <ul className="footer-links">
            <li>
              <a href="/inicio">Inicio</a>
            </li>
            <li>
              <a href="/ejercicios">Ejercicios</a>
            </li>
            <li>
              <a href="/rutinas">Rutinas</a>
            </li>
            <li>
              <a href="/contacto">Contacto</a>
            </li>
          </ul>
        </div>

        {/* Sección de contacto */}
        <div className="footer-section">
          <h3 className="footer-title">Contáctanos</h3>
          <p className="footer-contact">
            <span>help@valka.com</span>
          </p>
        </div>

        {/* Sección de redes sociales */}
        <div className="footer-section">
          <h3 className="footer-title">Síguenos</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Derechos de autor */}
      <div className="footer-bottom">
        <p>&copy; 2025 Valka. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
