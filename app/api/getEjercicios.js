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
      return [];
    }

    // Filtramos la rutina por su ID
    const rutinaEncontrada = rutinas.find((rutina) => rutina.id === rutinaId);
    if (!rutinaEncontrada) {
      return [];
    }

    // Extraemos los ejercicios de la rutina encontrada
    const ejercicios = rutinaEncontrada.ejercicios || [];
    if (ejercicios.length === 0) {
      return [];
    }

    return ejercicios.map((item) => ({
      id: item.id,
      ...item,
    }));
  } catch (error) {
    throw new Error();
  }
};
export async function fetchBlockById(id) {
  const apiUrl = ENV.API_BASE_URL;

  const endpoint = `${apiUrl}api/rutinas/${id}?populate=ejercicios`;

  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return null;
    }

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response vergiti" + response);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos de la API:", data);

    // Extraer los atributos del bloque
    return {
      id: data.data.id,
      ...data.data,
    };
  } catch (error) {
    console.error("Error al conectar con Strapi:", error);
    return null;
  }
}
