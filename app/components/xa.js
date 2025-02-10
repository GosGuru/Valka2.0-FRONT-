import { isAuthenticated, handleLogout } from "./user";
import Link from "next/link";
import { Button, Box } from "@mui/material";

const Navbar = () => {
  const isLoggedIn = isAuthenticated(); // Verifica si está autenticado

  return (
    <nav className="bg-[#1a1a1a] p-4 text-white">
      <ul className="flex justify-between">
        <li>
          <Link href="/" className="hover:text-[#f94510]">
            Inicio
          </Link>
        </li>

        {/* Si está logueado, mostrar solo botón de Cerrar Sesión */}
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className="hover:text-[#f94510]">
              Cerrar Sesión
            </button>
          </li>
        ) : (
          // Si no está logueado, mostrar botones de Login y Register
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Link href="/join/loginForm" passHref>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#f94510",
                  color: "#f94510",
                  "&:hover": { backgroundColor: "#f94510", color: "white" },
                  borderRadius: ".5rem",
                }}
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/join/registerForm" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f94510",
                  "&:hover": { backgroundColor: "#ffffff", color: "#f94510" },
                  borderRadius: ".5rem",
                }}
              >
                Registrarse
              </Button>
            </Link>
          </Box>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
