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

    // Dependiendo de la respuesta, data.data puede venir con o sin wrapper "attributes"
    const ejercicio =
      data?.data?.attributes !== undefined ? data.data.attributes : data.data;

    let videoAttributes = null;
    if (ejercicio.videoURL) {
      // Si la relación viene anidada en un objeto "data"
      if (ejercicio.videoURL.data) {
        videoAttributes = ejercicio.videoURL.data.attributes;
      } else {
        // Si viene directamente
        videoAttributes = ejercicio.videoURL;
      }
    }
    console.log("videoAttributes:", videoAttributes);

    return {
      // Usamos el exerciseId original para que coincida con la lista
      id: exerciseId,
      videoURL: {
        url: videoAttributes
          ? `${ENV.API_BASE_URL}${videoAttributes.url}`
          : null,
        mime: videoAttributes ? videoAttributes.mime : "video/mp4",
      },
    };
  } catch (error) {
    console.error("Error en getEjercicioConVideo:", error);
    throw error;
  }
};
