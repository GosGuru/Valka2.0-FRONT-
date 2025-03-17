import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "../scss/Block/blockList.scss";
import { bebasNeue, robotoSlab, zain } from "../ui/fonts";
import { useTheme } from "next-themes";

interface Block {
  id: number;
  titulo?: string;
  notes?: string;
}

interface BlockListProps {
  blocks: Block[];
  onSelectBlock: (id: number) => void;
}

const BlockList: React.FC<BlockListProps> = ({ blocks, onSelectBlock }) => {
  const { theme } = useTheme();

  return (
    <div className={`blocklist-container ${zain.className} ${theme === "dark" ? "dark" : ""}`}>
      <div className="block-list">
        {blocks.map((block) => (
          <Card
            key={block.id}
            className={`block-item ${robotoSlab.className}`}
            onClick={() => onSelectBlock(block.id)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#000000] to-[#562b02f7] opacity-50 rounded-xl !z-10">
              <Image
                src="/bgRoutine1.png"
                alt="Fondo del bloque"
                fill
                className="object-cover w-full m-0 rounded-xl !z-0"
                priority
              />
            </div>

            <div className="relative w-full h-full">
              <div className="relative z-20">
                <CardHeader>
                  <CardTitle className={`block-title ${bebasNeue.className}  ${theme === "dark" ? "dark" : ""}`}>
                    {block.titulo || "Bloque Sin Nombre"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`block-notes ${zain.className}`}>
                    {block.notes || "Sin notas"}
                  </p>
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