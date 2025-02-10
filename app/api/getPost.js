// Función para obtener todos los posts del blog
export async function getAllPosts() {
  const res = await fetch("http://localhost:1337/api/blog-posts?populate=*");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data.data; // Devuelve el array de posts
}

// Función para obtener un post específico por su slug
export async function getPostBySlug(slug) {
  const res = await fetch(
    `http://localhost:1337/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  const data = await res.json();
  return data.data[0];
}
