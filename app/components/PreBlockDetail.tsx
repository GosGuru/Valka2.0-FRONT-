import React, { useEffect, useState } from "react";
import { getEjercicios } from "../api/getEjercicios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "../scss/Block/style.scss";
import { ChevronLeft, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { Timer, Repeat2, Weight, TimerReset, Anchor } from "lucide-react";
import { bebasNeue, lexendDeca } from "../ui/fonts";
import { useTheme } from "next-themes";

interface Block {
  id: number;
  titulo?: string;
  notes?: string;
}

interface Ejercicio {
  id: number;
  nombre: string;
  series: string;
  carga: string;
  repeticiones: string;
  descanso: string;
}

interface PreBlockDetailProps {
  block: Block;
  onBack: () => void;
  onNext: () => void;
}

const PreBlockDetail: React.FC<PreBlockDetailProps> = ({
  block,
  onBack,
  onNext,
}) => {
  const { theme } = useTheme();
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getEjercicios(block.id);
        setEjercicios(data);
      } catch (err) {
        console.error("Error al cargar los ejercicios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [block.id]);

  const handleComenzarRutina = () => {
    setIsPlaying(true);
    setTimeout(() => onNext(), 200);
  };

  if (loading) return <Loading />;

  return (
    <div className={`preblockdetail-container ${theme === "dark" ? "dark" : ""}`}>
      <div className="container__details">
        <h1 className={`container__title ${lexendDeca.className}`}>
          {block.titulo || "Rutina sin nombre"}
        </h1>
        <div className="container__buttons">
          <Button
            onClick={onBack}
            className="back-button"
            variant="outline"
            size="icon"
          >
            <ChevronLeft />
          </Button>
          <Button
            className="container__goRutina flex items-center space-x-2"
            onClick={handleComenzarRutina}
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <Play
                className={`absolute inset-1 w-full h-full transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"
                  }`}
              />
              <Pause
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"
                  }`}
              />
            </div>
            <span className={`${lexendDeca.className} `}>COMENZAR RUTINA</span>
          </Button>
        </div>
      </div>
      <Accordion type="single" className={`containerAcordion` } collapsible>
        {ejercicios.length > 0 ? (
          ejercicios.map((ejercicio) => (
            <AccordionItem key={ejercicio.id} value={`item-${ejercicio.id}`}>
              <AccordionTrigger className={`ejercicio__nombre  ${bebasNeue.className}`}>
                {ejercicio.nombre}
              </AccordionTrigger>
              <AccordionContent className={`containerAcordion ${theme === "dark"
                  ? "bg-[var(--background-dark)]"
                  : "bg-[var(--background-light)]"
                } `}>
                <div className="ejercicio__container">
                  <p>
                    <span className={`ejercicio__reps span ${bebasNeue.className}`}>
                      <Anchor />
                      Series
                      <span className={`ejercicio__series ${bebasNeue.className}`}>
                        {ejercicio.series}
                      </span>
                    </span>
                  </p>
                  <p>
                    <span className={`ejercicio__reps span ${bebasNeue.className}`}>
                      <Weight />
                      Carga:
                      <span className={`ejercicio__tiempo ${bebasNeue.className}`}>
                        {ejercicio.carga}
                      </span>
                    </span>
                    <span className={`ejercicio__reps span ${bebasNeue.className}`}>
                      <Timer />
                      Descanso:
                      <span className={`ejercicio__tiempo ${bebasNeue.className}`}>
                        {ejercicio.descanso}
                      </span>
                    </span>
                  </p>
                  <p className="ejercicio__reps">
                    <span className={`ejercicio__reps span ${bebasNeue.className}`}>
                      <Repeat2 /> Repeticiones
                      <span className="ejercicio__series--series">
                        {ejercicio.repeticiones}
                      </span>
                    </span>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p className="no-ejercicios">No hay ejercicios disponibles.</p>
        )}
      </Accordion>
    </div>
  );
};

export default PreBlockDetail;