// PreBlockDetail.js
import React, { useEffect, useState } from "react";
import { getEjercicios } from "../api/getEjercicios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "../scss/preparedEjercicio/style.scss";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Block {
  id: number;
  titulo?: string;
  notes?: string;
}

interface Ejercicio {
  id: number;
  nombre: string;
  series: string;
  carga: string; // Puede ser un número o una cadena (dependiendo de tus datos)
  repeticiones: string;
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
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

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

  if (error) return <div>{error}</div>;
  if (loading)
    return (
      <div >
        <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] text-white">
          <div className="text-center">
            {/* Icono de carga */}
            <svg
              className="animate-spin h-12 w-12 mx-auto mb-4 text-[#f94510]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            {/* Texto de carga */}
            <p className="text-gray-400 text-sm">Cargando...</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="container__details">
        <h1 className="container__title">
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
          {/* Botón para continuar al detalle completo */}
          <Button className="container__goRutina" onClick={onNext}>
            Ver Detalles Completos
          </Button>
        </div>
      </div>
      <Accordion type="single" collapsible>
        {ejercicios.length > 0 ? (
          ejercicios.map((ejercicio) => (
            <AccordionItem key={ejercicio.id} value={`item-${ejercicio.id}`}>
              <AccordionTrigger className="ejercicio__nombre">
                {ejercicio.nombre}
              </AccordionTrigger>
              <AccordionContent>
                <div className="ejercicio__container">
                  <p>
                    <span>Series:</span>{" "}
                    <span className="ejercicio__series">
                      {ejercicio.series}
                    </span>
                  </p>
                  <p>
                    <span>Carga:</span>{" "}
                    <span className="ejercicio__tiempo">{ejercicio.carga}</span>
                  </p>
                  <p className="ejercicio__reps">
                    <span>Repeticiones:</span>{" "}
                    <span className="ejercicio__series--series">
                      {ejercicio.repeticiones}
                    </span>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p>No hay ejercicios disponibles para esta rutina.</p>
        )}
      </Accordion>
    </div>
  );
};

export default PreBlockDetail;
