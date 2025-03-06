import { ENV } from "../utils";

export const getEjercicioConVideo = async (exerciseId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Falta el token de autenticación");
    }

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
    console.log("Respuesta del API:", data); // Esto te ayudará a ver la estructura

    // Suponiendo que la estructura es: data.data.attributes.videoURL.data.attributes
    const ejercicio = data.data?.attributes ? data.data.attributes : data.data;
    let videoAttributes = null;

    // Verificamos si videoURL existe y es anidado
    if (ejercicio.videoURL) {
      // Si videoURL viene anidado, accedemos a data.attributes
      if (ejercicio.videoURL.data && ejercicio.videoURL.data.attributes) {
        videoAttributes = ejercicio.videoURL.data.attributes;
      } else {
        videoAttributes = ejercicio.videoURL;
      }
    }

    return {
      id: exerciseId,
      videoURL: {
        url: videoAttributes?.url
          ? // Si la URL es relativa, la concatenamos con el API_BASE_URL
            videoAttributes.url.startsWith("http")
            ? videoAttributes.url
            : `${ENV.API_BASE_URL}${videoAttributes.url}`
          : null,
        mime: videoAttributes?.mime || "video/mp4", // Valor por defecto corregido
      },
    };
  } catch (error) {
    console.error("Error en getEjercicioConVideo:", error);
    throw error;
  }
};
