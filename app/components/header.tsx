"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
// Componentes shadcn
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// Toggle de modo (adaptado a shadcn)
import { ModeToggle } from "./mode-toggle";
// Icono de lucide-react para menú móvil
import { Menu } from "lucide-react";
// Usamos Bebas Neue para el header, resaltando títulos y navegación
import { bebasNeue } from "../ui/fonts";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/join/loginForm");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`bg-background shadow-md ${bebasNeue.className} `}>
      <div className="mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo Valka"
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>

        {/* Navegación - Desktop */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/sobrenosotros"
            className="text-foreground hover:text-orange-500 transition-colors duration-300"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="../pages/routines/"
            className="text-foreground hover:text-orange-500 transition-colors duration-300"
          >
            Rutinas
          </Link>
          <Link
            href="/contact"
            className="text-foreground hover:text-orange-500 transition-colors duration-300"
          >
            Contacto
          </Link>
          <Link
            href="/blog"
            className="text-foreground hover:text-orange-500 transition-colors duration-300"
          >
            Blog
          </Link>
        </nav>

        {/* Modo y acciones de autenticación - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-orange-500 border-orange-500 transition-transform duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
              >
                Cerrar Sesión
              </Button>
              <Link href="/profile">
                <Avatar>
                  <AvatarImage
                    src={user.fotoPerfil || "/default-avatar.jpg"}
                    alt={user.username || "Perfil"}
                  />
                  <AvatarFallback>
                    {user.username?.charAt(0).toUpperCase() || "P"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/join/loginForm">
                <Button
                  variant="outline"
                  className="text-orange-500 border-orange-500 transition-transform duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/join/registerForm">
                <Button
                  variant="default"
                  className="bg-orange-500 text-white transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-orange-500"
                >
                  Registrarse
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Botón de menú para móviles */}
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <Menu size={24} className="text-foreground" />
        </button>

        {/* Overlay para cerrar el menú al hacer clic fuera */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          ></div>
        )}

        {/* Menú móvil */}
        <nav
          className={`md:hidden absolute top-full right-0 w-full bg-background border-t border-orange-500
    ${
      menuOpen
        ? "translate-y-0 opacity-100"
        : "hidden opacity-0 pointer-events-none"
    }
    transition-all duration-300 ease-in-out z-50`}
        >
          <div className="px-4 py-4 flex flex-col gap-2">
            <Link
              href="/sobrenosotros"
              className="text-foreground hover:text-orange-500 transition-colors duration-300"
              onClick={closeMenu}
            >
              Sobre Nosotros
            </Link>
            <Link
              href="../pages/routines/"
              className="text-foreground hover:text-orange-500 transition-colors duration-300"
              onClick={closeMenu}
            >
              Rutinas
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-orange-500 transition-colors duration-300"
              onClick={closeMenu}
            >
              Contacto
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-orange-500 transition-colors duration-300"
              onClick={closeMenu}
            >
              Blog
            </Link>

            {/* Modo oscuro en móviles */}
            <div className="mt-2">
              <ModeToggle />
            </div>

            <div className="mt-2">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full text-orange-500 border-orange-500 transition-transform duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
                  >
                    Cerrar Sesión
                  </Button>
                  <Link href="/profile">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={user.fotoPerfil || "/default-avatar.jpg"}
                          alt={user.username || "Perfil"}
                        />
                        <AvatarFallback>
                          {user.username?.charAt(0).toUpperCase() || "P"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">Perfil</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/join/loginForm">
                    <Button
                      variant="outline"
                      className="w-full text-orange-500 border-orange-500 transition-transform duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white"
                    >
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/join/registerForm">
                    <Button
                      variant="default"
                      className="w-full bg-orange-500 text-white transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-orange-500"
                    >
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
