"use client";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import CustomVideoPlayer from "./CustomVideoPlayer";
import Timer from "./Timer";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorageHelper";
import { getEjercicios } from "../api/getEjercicios";
import { getEjercicioConVideo } from "../api/getEjerciciosVideo";
import "../scss/Block/BlockDetail.scss"; // Importa el archivo SCSS
import { Exo2 } from "../ui/fonts";
import { toast } from "sonner";

const BlockDetail = ({ block, onBack }) => {
  const [exercises, setExercises] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState({});
  const [completedSeries, setCompletedSeries] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const fetchedExercises = await getEjercicios(block.id);
        setExercises(fetchedExercises);
        const videoPromises = fetchedExercises.map((exercise) =>
          getEjercicioConVideo(exercise.id)
        );
        const videos = await Promise.all(videoPromises);
        const videosMap = videos.reduce((acc, video) => {
          acc[String(video.id)] = {
            url: video.videoURL?.url || null,
            mime: video.videoURL?.mime || "video/mp4",
          };
          return acc;
        }, {});
        setExerciseVideos(videosMap);
        const storedProgress = loadFromLocalStorage("completedSeries");
        if (storedProgress) {
          setCompletedSeries(storedProgress);
        }
      } catch (error) {
        console.error("Error al cargar ejercicios:", error);
      }
    };
    fetchExercises();
  }, [block.id]);

  const resetearDia = () => {
    localStorage.removeItem("completedSeries");
    setCompletedSeries({});
    toast("Las series han sido reseteadas.");
  };

  const handleCompleteSeries = (exerciseId) => {
    setCompletedSeries((prev) => {
      const updatedSeries = {
        ...prev,
        [exerciseId]: (prev[exerciseId] || 0) + 1,
      };
      saveToLocalStorage("completedSeries", updatedSeries);
      return updatedSeries;
    });
  };

  const handleNextExercise = () => {
    alert("Avanzando al siguiente ejercicio...");
    // Aquí puedes implementar la lógica para avanzar al siguiente ejercicio
  };

  return (
    <div className="block-detail">
      {/* Botón para volver */}
      <button className="back-button" onClick={onBack}>
        <ArrowBack />
      </button>

      {/* Cuadro de diálogo de confirmación para resetear series */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="reset-button">Resetear Series</button>
        </AlertDialogTrigger>
        <AlertDialogContent className="alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se reiniciarán todas las series
              completadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="alert-dialog-cancel">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="alert-dialog-action"
              onClick={resetearDia}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h2>{block.titulo || "Bloque sin nombre"}</h2>
      <p>{block.notes || "Sin notas"}</p>

      {exercises.length > 0 ? (
        <div>
          <p className="navigation-tip">
            Desliza para navegar entre los ejercicios.
          </p>
          <Carousel className="carousel-container">
            <CarouselContent>
              {exercises.map((exercise) => {
                const isCompleted =
                  (completedSeries[exercise.id] || 0) >= exercise.series;
                const videoData = exerciseVideos[String(exercise.id)];
                return (
                  <CarouselItem key={exercise.id}>
                    <div className="exercise-item">
                      <h3>{exercise.nombre || "Ejercicio sin nombre"}</h3>
                      <p className="difficulty">
                        Dificultad: {exercise.dificultad || "Desconocida"}
                      </p>
                      <div className="video-container">
                        {videoData?.url ? (
                          <CustomVideoPlayer
                            src={videoData.url}
                            type={videoData.mime}
                          />
                        ) : (
                          <p>No hay video disponible.</p>
                        )}
                      </div>
                      <div className="exercise-details">
                        <span>Reps: {exercise.repeticiones || "N/A"}</span>
                        <span>Carga: {exercise.carga || "N/A"}</span>
                        <span>Descanso: {exercise.descanso || "N/A"}</span>
                        <span>Series: {exercise.series || "N/A"}</span>
                      </div>
                      <div className="timer-container">
                        <Timer />
                        <span className="completed-series">
                          Series Completadas:{" "}
                          {completedSeries[exercise.id] || 0}/
                          {exercise.series || "N/A"}
                        </span>
                        <div className="button-group">
                          {/* Botón para completar serie */}
                          <button
                            onClick={() => handleCompleteSeries(exercise.id)}
                            disabled={
                              (completedSeries[exercise.id] || 0) >=
                              exercise.series
                            }
                            className="complete-button"
                          >
                            Completar Serie
                          </button>

                          {/* Botón "Next" que aparece cuando se completan las series */}
                          {isCompleted && (
                            <div className="ContenedorNext">
                              <CarouselNext className="container__next" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      ) : (
        <p className="no-exercises">Este bloque no tiene ejercicios.</p>
      )}
    </div>
  );
};

export default BlockDetail;
