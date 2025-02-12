"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { fetchBlockById } from "../../../api/getEjercicios";

interface Block {
  id: number;
  titulo: string;
  notes?: string;
}

const StartRoutinePage = ({ block }: { block: Block }) => {
  const router = useRouter();

  if (!block) {
    return <div>Rutina no encontrada</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">
        Iniciando Rutina: {block.titulo}
      </h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={() => router.back()}
      >
        Volver
      </button>
    </div>
  );
};

// Función para obtener datos del servidor
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };

  try {
    const block = await fetchBlockById(id); // Obtener datos del bloque desde Strapi
    if (!block) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        block,
      },
    };
  } catch (error) {
    console.error("Error al cargar los datos de la rutina:", error);
    return {
      notFound: true,
    };
  }
}

export default StartRoutinePage;
