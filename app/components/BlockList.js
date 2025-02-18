import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "../scss/Block/blockList.scss";

const BlockList = ({ blocks, onSelectBlock }) => {
  return (
    <div className="container__list">
      <div className="block-list">
        {blocks.map((block) => (
          <Card
            key={block.id}
            className="block-item"
            onClick={() => onSelectBlock(block.id)}
          >
            {/* Contenedor relativo para la imagen y el contenido */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#000000] to-[#562b02f7] opacity-50 rounded-xl !z-10">
              {" "}
              <Image
                src="/bgRoutine1.png"
                alt="Fondo del bloque"
                fill
                className="object-cover w-full m-0 rounded-xl !z-0"
                priority
              />
            </div>

            <div className="relative w-full h-full">
              {/* Imagen de fondo optimizada con next/image */}
              {/* Overlay con gradiente */}

              {/* Contenido del Card */}
              <div className="relative z-20">
                <CardHeader>
                  <CardTitle className="block-title">
                    {block.titulo || "Bloque Sin Nombre"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="block-notes">{block.notes || "Sin notas"}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlockList;
