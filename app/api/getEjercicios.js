import { ENV } from "../utils";
export const getEjercicios = async (rutinaId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Falta el token de autenticación");
    }

    const response = await fetch(
      `${ENV.API_BASE_URL}/api/rutinas/?populate=ejercicios`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos de la API:", data);

    // Extraemos todas las rutinas
    const rutinas = data?.data || [];
    if (!Array.isArray(rutinas) || rutinas.length === 0) {
      console.warn("No se encontraron rutinas en la respuesta de la API.");
      return [];
    }

    // Filtramos la rutina por su ID
    const rutinaEncontrada = rutinas.find((rutina) => rutina.id === rutinaId);
    if (!rutinaEncontrada) {
      console.warn(`No se encontró la rutina con ID ${rutinaId}.`);
      return [];
    }

    // Extraemos los ejercicios de la rutina encontrada
    const ejercicios = rutinaEncontrada.ejercicios || [];
    if (ejercicios.length === 0) {
      console.warn("No se encontraron ejercicios en la rutina.");
      return [];
    }

    return ejercicios.map((item) => ({
      id: item.id,
      ...item,
    }));
  } catch (error) {
    console.error("Error en getEjercicios:", error);
    throw new Error("Error al obtener los ejercicios.");
  }
};
