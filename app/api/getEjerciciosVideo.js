import { ENV } from "../utils";

export const getEjercicioConVideo = async (exerciseId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Falta el token de autenticación");
    }

    console.log("ID DE VIDEO:", exerciseId);

    // Solicitamos el ejercicio individual con populate para el campo videoURL
    const url = `${ENV.API_BASE_URL}/api/ejercicios/${exerciseId}?populate=videoURL`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos del ejercicio con video:", data);

    // Extraer el ejercicio desde la respuesta
    const ejercicio = data.data;

    // Verificar si el ejercicio tiene videoURL
    let videoAttributes = null;
    if (ejercicio.videoURL) {
      videoAttributes = ejercicio.videoURL;
    }

    console.log("videoAttributes:", videoAttributes);

    return {
      // Usamos el exerciseId original para que coincida con la lista
      id: exerciseId,
      videoURL: {
        url: videoAttributes?.url || null, // Si no hay videoURL, asignar null
        mime: videoAttributes?.mime || "video/mp4", // Usar el mime si existe, o "video/mp4" por defecto
      },
    };
  } catch (error) {
    console.error("Error en getEjercicioConVideo:", error);
    throw error;
  }
};
