"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Collapse,
  Container,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext"; // Usa el contexto de autenticación
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Llama a la función `logout` del contexto
    router.push("/join/loginForm"); // Redirige al usuario a la página de login
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1a1a1a", boxShadow: 3, width: "100%" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Logo con enlace al inicio */}
          <Link href="/" passHref>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/logo.png"
                alt="Logo Valka"
                width={120}
                height={120}
                loading="lazy"
              />
            </div>
          </Link>

          {/* Navegación para pantallas grandes */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Link href="/sobrenosotros" passHref>
              <Button sx={{ color: "white", "&:hover": { color: "#f94510" } }}>
                Sobre Nosotros
              </Button>
            </Link>
            <Link href="/routines" passHref>
              <Button sx={{ color: "white", "&:hover": { color: "#f94510" } }}>
                Rutinas
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button sx={{ color: "white", "&:hover": { color: "#f94510" } }}>
                Contacto
              </Button>
            </Link>
            <Link href="/blog" passHref>
              <Button sx={{ color: "white", "&:hover": { color: "#f94510" } }}>
                Blog
              </Button>
            </Link>
          </Box>

          {/* Botones condicionales según el estado de autenticación para pantallas grandes */}
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "#f94510",
                  "&:hover": { color: "#ffffff", backgroundColor: "#f94510" },
                }}
              >
          
              </Button>
              {/* Link con avatar al perfil del usuario */}
              <Link href="/profile" passHref>
                <Avatar
                  alt={user.username || "Perfil"}
                  src={user.fotoPerfil || "/default-avatar.jpg"}
                  sx={{ width: 40, height: 40 }}
                />
              </Link>
            </Box>
          ) : (
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

          {/* Botón de menú para pantallas pequeñas */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Menú colapsable para pantallas pequeñas */}
      <Collapse in={menuOpen} timeout="auto" unmountOnExit>
        <Box
          sx={{
            backgroundColor: "#1a1a1a",
            display: { xs: "block", md: "none" },
            padding: 2,
            borderTop: "1px solid #f94510",
            boxShadow: 3,
          }}
        >
          <Link href="/sobrenosotros" passHref>
            <Button
              fullWidth
              sx={{ color: "white", "&:hover": { color: "#f94510" } }}
            >
              Sobre Nosotros
            </Button>
          </Link>
          <Link href="/routines" passHref>
            <Button
              fullWidth
              sx={{ color: "white", "&:hover": { color: "#f94510" } }}
            >
              Rutinas
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button
              fullWidth
              sx={{ color: "white", "&:hover": { color: "#f94510" } }}
            >
              Contacto
            </Button>
          </Link>
          <Link href="/blog" passHref>
            <Button
              fullWidth
              sx={{ color: "white", "&:hover": { color: "#f94510" } }}
            >
              Blog
            </Button>
          </Link>

          {/* Botones condicionales según el estado de autenticación para pantallas pequeñas */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  fullWidth
                  onClick={handleLogout}
                  sx={{
                    color: "#f94510",
                    "&:hover": { color: "#ffffff", backgroundColor: "#f94510" },
                  }}
                >
                  Cerrar Sesión
                </Button>
                {/* Link con avatar al perfil en versión móvil */}
                <Link href="../profile" passHref>
                  <Avatar
                    alt={user.username || "Perfil"}
                    src={user.fotoPerfil || "/default-avatar.png"}
                    sx={{ width: 40, height: 40 }}
                  />
                </Link>
              </Box>
            ) : (
              <>
                <Link href="/join/loginForm" passHref>
                  <Button
                    fullWidth
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
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#f94510",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: "#f94510",
                      },
                      borderRadius: ".5rem",
                    }}
                  >
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Collapse>
    </AppBar>
  );
}
