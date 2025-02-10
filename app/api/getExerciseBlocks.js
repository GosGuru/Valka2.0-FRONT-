// api/getExerciseBlocks.js
import { ENV } from "../utils";

export const getExerciseBlocks = async () => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Falta el token de autenticación");
    }

    // Obtener los datos del usuario autenticado con las rutinas pobladas
    const userResponse = await fetch(
      `${ENV.API_BASE_URL}/api/users/me?populate=rutinas`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.log("Error al obtener los datos del usuario:", errorData);
      throw new Error("No se pudo obtener los datos del usuario");
    }

    const userData = await userResponse.json(); // Procesar la respuesta como JSON

    // Verificar si el usuario tiene rutinas asignadas
    if (!userData.rutinas || userData.rutinas.length === 0) {
      return []; // Devolver una lista vacía si no hay rutinas asignadas
    }

    // Devolver las rutinas asignadas al usuario
    return userData.rutinas;
  } catch (error) {
    console.error("Error capturado:", error.message);
    return [];
  }
};
