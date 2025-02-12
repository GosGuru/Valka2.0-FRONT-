import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "../scss/Block/blockList.scss";

const BlockList = ({ blocks, onSelectBlock }) => {
  console.log("Datos de las rutinas:", blocks);

  return (
    <div className="container__list">
      <div className="block-list">
        {blocks.map((block) => (
          <Card
            key={block.id}
            className="block-item"
            onClick={() => onSelectBlock(block.id)}
          >
            <CardHeader>
              <CardTitle className="block-title">
                {block.titulo || "Bloque Sin Nombre"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="block-notes">{block.notes || "Sin notas"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlockList;
