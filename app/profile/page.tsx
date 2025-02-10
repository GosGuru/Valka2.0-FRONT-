"use client";

import { useState, useEffect, ChangeEvent } from "react";
import styles from "../scss/profile/profile.module.scss";
// Usamos la función de la API que ya tenemos definida
import { getUser } from "../api/getUser";
import { useAuth } from "../context/authContext"; // Si manejas el token o datos desde el contexto

// Definimos una interfaz para tipar los datos del usuario
interface UserProfile {
  id: number;
  username: string;
  email: string;
  fotoPerfil: string | null;
}

const defaultAvatar = "/default-avatar.png";

const ProfilePage = () => {
  // Si ya tienes el token en el contexto, lo podemos obtener; de lo contrario, lo sacamos del localStorage.
  const { token: authToken } = useAuth();

  // Estado local para el usuario y para el loading
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hacemos la llamada a la API usando la función getUser
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtenemos el token: priorizamos el token del contexto, y si no, lo sacamos de localStorage.
        const token = authToken || localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No hay token de autenticación");
        }

        const data = await getUser(token);

        // Transformamos los datos de acuerdo a lo que necesitemos.
        // Por ejemplo, si data.fotoPerfil es un objeto, obtenemos la URL.
        const userData: UserProfile = {
          id: data.id,
          username: data.username,
          email: data.email,
          fotoPerfil: data.fotoPerfil ? data.fotoPerfil.url : null,
        };
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authToken]);

  // Mientras carga, mostramos un mensaje de "cargando..."
  if (loading) return <p>Cargando...</p>;

  // Si no se pudo obtener el usuario, mostramos mensaje o redirigimos
  if (!user) return <p>No autorizado. Debes iniciar sesión.</p>;

  // Función para manejar el cambio de foto de perfil.
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  // //     const reader = new FileReader();
  // //     reader.onload = (event) => {
  // //       if (event.target?.result) {
  // //         setUser((prevUser: UserProfile) => ({
  // //           ...prevUser,
  // //           fotoPerfil: event.target!.result as string,
  // //         }));
  // //         // Aquí podrías hacer una petición para actualizar la foto en tu backend (Strapi)
  // //       }
  // //     };
  // //     reader.readAsDataURL(file);
  // //   }
  // // };

  // Función para disparar el input file de forma programática.
  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mi Perfil</h1>
      </header>
      <h1 className="fixed top m-1 text-3xl text-red-800 bg-slate-400">Página en MANTENIMIENTO</h1>
      <main className={styles.profileCard}>
        {/* Sección de la foto de perfil */}
        <div className={styles.profilePhoto}>
          <img
            src={user.fotoPerfil || defaultAvatar}
            alt="Foto de Perfil"
            width={120}
            height={120}
            className={styles.image}
          />
          <button onClick={handleUploadClick} className={styles.button}>
            Cambiar Foto
          </button>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
        {/* Sección de información del usuario */}
        <div className={styles.profileInfo}>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
