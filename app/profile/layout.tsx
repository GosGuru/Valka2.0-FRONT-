"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../context/authContext";
import { User, Settings, LogOut, Menu } from "lucide-react";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const closeSidebar = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("aside")) return;
    setIsSidebarOpen(false);
  };

  return (
    <div
      className="flex h-screen flex-col md:flex-row relative"
      onClick={closeSidebar}
    >
      {/* Mobile Menu Button */}
      <button
        className="p-2 md:hidden self-start"
        onClick={(e) => {
          e.stopPropagation();
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r p-4 flex flex-col transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:block`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col space-y-2">
          <Link href="/profile/">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-5 w-5" /> Información
            </Button>
          </Link>
          <Link href="/profile/edit">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-5 w-5" /> Editar Información
            </Button>
          </Link>
        </nav>
        <div className="mt-auto">
          <Separator className="my-4" />
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="mr-2 h-5 w-5" /> Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default ProfileLayout;
