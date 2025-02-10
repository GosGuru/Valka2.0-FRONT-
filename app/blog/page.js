// app/blog/page.js
import Link from "next/link";
import { getAllPosts } from "../api/getPost";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import styles from "../scss/blog/BlogLayout.module.scss";

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500">No hay posts disponibles.</p>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title__Blog}>BLOG Val<span className={styles.ka__blok}>ka</span></h1>
      <div className={styles.blogs__container}>
        {posts.map((post) => {
          if (!post) return null;
          

          return (
            // Envuelve toda la tarjeta en un Link usando la propiedad `component`

            <Card
              key={post.id}
              component={Link}
              href={`/blog/${post.slug || "#"}`}
              className={`${styles.blogs__cards} cursor-pointer`}
              sx={{
                textDecoration: "none", // Elimina el subrayado del enlace
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)", // Efecto hover sutil
                },
              }}
            >
              {/* Imagen destacada */}
              {post.featuredImage && (
                <CardMedia
                  component="img"
                  image={`http://localhost:1337${post.featuredImage.url}`}
                  alt={post.Titulo || "Imagen destacada"}
                  className={styles.cardMedia}
                />
              )}

              {/* Contenido del post */}
              <CardContent className={styles.cardContent}>
                {/* Título */}
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={styles.title}
                >
                  {post.Titulo || "Sin título"}
                </Typography>

                {/* Descripción corta */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.shortDescription}
                >
                  {post.DescripcionCorta &&
                  post.DescripcionCorta[0]?.children[0]?.text
                    ? post.DescripcionCorta[0].children[0].text
                    : "Sin descripción"}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
