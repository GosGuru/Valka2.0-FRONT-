// app/blog/[slug]/page.tsx
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "../../api/getPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Ícono de flecha hacia atrás
import { ENV } from "@/app/utils";

export default async function BlogPostPage({ params }) {
  // Acceder a params.slug directamente
  const slug = params.slug;

  // Obtener el post usando el slug
  const post = await getPostBySlug(slug);

  if (!post) {
    return <p>Post no encontrado.</p>;
  }

  const postData = post;

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      {/* Flecha de retroceso */}
      <div className="mb-6">
        <Link href="/blog" passHref>
          <IconButton aria-label="Volver atrás" color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </div>

      {/* Título */}
      <h1 className="text-3xl font-bold text-center mb-6">{postData.Titulo}</h1>

      {/* Imagen destacada */}
      {postData.featuredImage && (
        <div className="relative w-full h-96 overflow-hidden rounded-lg mb-6">
          <img
            src={`${ENV.API_BASE_URL}${postData.featuredImage.url}`}
            alt={postData.Titulo}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      {/* Descripción corta */}
      {postData.DescripcionCorta && (
        <p className="text-gray-600 mb-6">
          {postData.DescripcionCorta[0]?.children[0]?.text || "Sin descripción"}
        </p>
      )}

      {/* Contenido Rich Text */}
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose lg:prose-xl">
        {renderRichText(postData.Descripcion)}
      </ReactMarkdown>
    </div>
  );
}

// Genera parámetros estáticos para Next.js
export async function generateStaticParams() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return [];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
// Función auxiliar para renderizar el contenido Rich Text en Markdown
function renderRichText(blocks) {
  if (!blocks || blocks.length === 0) return "";
  return blocks
    .map((block) => {
      if (block.type === "heading") {
        const level = block.level || 1;
        const text = block.children.map((child) => child.text).join("");
        return `${"#".repeat(level)} ${text}\n\n`;
      }
      if (block.type === "paragraph") {
        const text = block.children.map((child) => child.text).join("");
        return `${text}\n\n`;
      }
      return "";
    })
    .join("");
}
