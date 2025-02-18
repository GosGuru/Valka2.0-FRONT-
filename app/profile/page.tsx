"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importamos el hook de navegación
import styles from "../scss/profile/profile.module.scss";
import { getUser } from "../api/getUser";
import { useAuth } from "../context/authContext";
import Loading from "../components/Loading";
import { Separator } from "@/components/ui/separator";

// Definimos una interfaz para tipar los datos del usuario
interface UserProfile {
  id: number;
  username: string;
  email: string;
  Marca: string;
  fotoPerfil: string | null;
}

const defaultAvatar = "/default-avatar.png";

const ProfilePage = () => {
  const router = useRouter();
  const { token: authToken } = useAuth();

  // Estados locales para el usuario y el loading
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = authToken || localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No hay token de autenticación");
        }

        const data = await getUser(token);

        const userData: UserProfile = {
          id: data.id,
          username: data.username,
          email: data.email,
          // La API retorna "Marcas", pero en nuestro modelo se llama "Marca" para mostrarlo.
          Marca: data.Marcas,
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

  // Una vez que finaliza la carga, si no hay usuario autenticado redirigimos a login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) <Loading />;

  // Si ya redirigió, retornamos null para no renderizar nada
  if (!user) return null;

  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className={styles.container}>
      <h1>Mi Perfil de {user.username}</h1>

      <main className={styles.profileCard}>
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

        <Separator orientation="vertical" />
        <div className={styles.profileInfo}>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <p className="text-cyan-900">Marcas: {user.Marca}</p>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
