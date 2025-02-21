"use client";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

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
import { Activity, Repeat2, Weight, TimerReset, Anchor } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
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
import "../scss/Block/BlockDetail.scss";
import { toast } from "sonner";
import { ENV } from "../utils";

const BlockDetail = ({ block, onBack }) => {
  const [exercises, setExercises] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState({});
  const [completedSeries, setCompletedSeries] = useState({});
  const [progress, setProgress] = useState(0);
  const [totalCompletedSeries, setTotalCompletedSeries] = useState(0); // Nuevo estado para el total de series completadas
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
      } catch (error) {
        console.log("Error al cargar ejercicios:", error);
      }
    };
    fetchExercises();
  }, [block.id]);

  const resetearDia = () => {
    setCompletedSeries({});
    toast("Las series han sido reseteadas.");
  };

  const handleCompleteSeries = (exerciseId) => {
    setCompletedSeries((prev) => {
      const updatedSeries = {
        ...prev,
        [exerciseId]: (prev[exerciseId] || 0) + 1,
      };
      return updatedSeries;
    });
  };

  const calculateProgressPercentage = () => {
    if (!exercises.length) return 0;
    let totalCompleted = 0;
    exercises.forEach((exercise) => {
      totalCompleted += Math.min(
        completedSeries[exercise.id] || 0,
        exercise.series
      );
    });
    const totalSeries = exercises.reduce(
      (sum, exercise) => sum + exercise.series,
      0
    );
    console.log("totalcompeted? : ", totalCompleted);
    console.log("totalSeries? : ", totalSeries);
    const result = totalSeries
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0);
    console.log("resultado ", result);
    return totalSeries === 0 ? 0 : (totalCompleted / result) * 100;
  };

  const calculateTotalCompletedSeries = () => {
    let totalCompleted = 0;
    exercises.forEach((exercise) => {
      totalCompleted += completedSeries[exercise.id] || 0;
    });
    return totalCompleted;
  };

  useEffect(() => {
    const calculatedProgress = calculateProgressPercentage();
    const totalCompleted = calculateTotalCompletedSeries();
    console.log("totalCompleted:  ", totalCompleted);
    console.log("calculatedProgress:  ", calculatedProgress);

    setProgress(calculatedProgress);
    setTotalCompletedSeries(totalCompleted);
  }, [completedSeries, exercises]);

  const handleCarouselChange = (index) => {
    setCurrentExerciseIndex(index);
    setProgress(calculateProgressPercentage());
  };

  return (
    <div className="block-detail">
      {/* Botón para volver */}

      {/* <h2>{block.titulo || "Bloque sin nombre"}</h2>
      <p>{block.notes || "Sin notas"}</p> */}
      {exercises.length > 0 ? (
        <div>
          <div className="container__tools">
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
                    Esta acción no se puede deshacer. Se reiniciarán todas las
                    series completadas.
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
          </div>
          <Separator orientation="vertical" />

          {/* <p className="navigation-tip">
            Desliza para navegar entre los ejercicios.
          </p> */}
          <Carousel
            className="carousel-container"
            opts={{
              onSnapToItem: (index) => handleCarouselChange(index),
            }}
          >
            <CarouselContent>
              {exercises.map((exercise, index) => {
                const isCompleted =
                  (completedSeries[exercise.id] || 0) >= exercise.series;
                const videoData = exerciseVideos[String(exercise.id)];
                return (
                  <CarouselItem key={exercise.id}>
                    <div className="exercise-item">
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
                      <h3>{exercise.nombre || "Ejercicio sin nombre"}</h3>
                      <p
                        className={`difficulty ${
                          exercise.dificultad?.toLowerCase() || "desconocida"
                        }`}
                      >
                        Dificultad: {exercise.dificultad || "No asignada"}
                      </p>
                      {/* Barra de progreso */}
                      <div className="progress-container">
                        <p className="progress-container--p">
                          {progress.toFixed(2)}%
                        </p>
                        <Progress value={progress.toFixed(2)} />
                        <br />
                        <p className="progress-container-series">
                          <span className="series__realizadas">
                            SERIES REALIZADAS{" "}
                            <Activity className="text-green-600 " />
                            {totalCompletedSeries}
                          </span>
                        </p>
                      </div>{" "}
                      <div className="exercise-details">
                        <span className="container__details-ejercicios">
                          <Repeat2 />
                          Reps: {exercise.repeticiones || "N/A"}
                        </span>

                        <span className="container__details-ejercicios">
                          <Weight />
                          Carga: {exercise.carga || "N/A"}
                        </span>

                        <span className="container__details-ejercicios">
                          <TimerReset />
                          Descanso: {exercise.descanso || "N/A"}
                        </span>

                        <span className="container__details-ejercicios">
                          <Anchor />
                          Series: {exercise.series || "N/A"}
                        </span>
                      </div>
                      <div className="timer-container">
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
