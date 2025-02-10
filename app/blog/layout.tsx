"use client";
import React, { useState } from "react";
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import styles from "../scss/blog/BlogLayout.module.scss";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.blogLayout}>
      {/* Fondo oscuro para móviles */}
      {isSidebarOpen && (
        <div
          className={styles.sidebarBackdrop}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Ícono de menú para móviles */}
      <IconButton
        className={styles.menuIcon}
        onClick={() => setIsSidebarOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        {/* Botón para cerrar el sidebar */}
        <IconButton
          onClick={() => setIsSidebarOpen(false)}
          className={styles.sidebarToggle}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Contenido del sidebar */}
        <List className={styles.sidebarList}>
          <ListItem disablePadding>
            <ListItemButton
              className={`${styles.sidebarListItemButton} ${
                isSidebarOpen
                  ? styles.listItemButtonOpen
                  : styles.listItemButtonClosed
              }`}
            >
              {isSidebarOpen && "Categorías"}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={`${styles.sidebarListItemButton} ${
                isSidebarOpen
                  ? styles.listItemButtonOpen
                  : styles.listItemButtonClosed
              }`}
            >
              {isSidebarOpen && "Etiquetas"}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={`${styles.sidebarListItemButton} ${
                isSidebarOpen
                  ? styles.listItemButtonOpen
                  : styles.listItemButtonClosed
              }`}
            >
              {isSidebarOpen && "Archivos"}
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      {/* Contenedor del blog */}
      <main
        className={`${styles.blogContent} ${
          isSidebarOpen ? styles.contentOpen : styles.contentClosed
        }`}
      >
        {children}
      </main>
    </div>
  );
}
