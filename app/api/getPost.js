import { ENV } from "../utils";

// Función para obtener todos los posts del blog
export async function getAllPosts() {
  try {
    const res = await fetch(`${ENV.API_BASE_URL}/api/blog-posts?populate=*`);
    if (!res.ok) {
      const errorText = await res.text(); // Lee la respuesta como texto para más detalles
      throw new Error(
        `Failed to fetch posts: ${res.status} ${res.statusText}. ${errorText}`
      );
    }
    const data = await res.json();
    return data.data; // Devuelve el array de posts
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    throw error;
  }
}

// Función para obtener un post específico por su slug
export const getPostBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${ENV.API_BASE_URL}/api/blog-posts?filters[slug]=${slug}&populate=*`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data?.data[0]?.attributes || null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
};
