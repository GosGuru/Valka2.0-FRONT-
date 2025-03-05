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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Exo2, zain, lexendDeca, bebasNeue } from "../ui/fonts";

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

  const parseSeriesValue = (seriesValue) => {
    if (typeof seriesValue === "string") {
      const numericPart = parseInt(seriesValue);
      return isNaN(numericPart) ? 0 : numericPart; // Devuelve 0 si no puede convertir a número
    }
    return seriesValue;
  };

  const calculateProgressPercentage = () => {
    if (!exercises.length) return 0;
    let totalCompleted = 0;
    let totalSeries = 0;

    exercises.forEach((exercise) => {
      const seriesValue = parseSeriesValue(exercise.series);
      totalCompleted += Math.min(
        completedSeries[exercise.id] || 0,
        seriesValue
      );
      totalSeries += seriesValue;
    });

    console.log("totalCompleted? : ", totalCompleted);
    console.log("totalSeries? : ", totalSeries);

    return totalSeries === 0 ? 0 : (totalCompleted / totalSeries) * 100;
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
            <AlertDialog className="rounded-lg border-[#c5512d]">
              <AlertDialogTrigger asChild>
                <button className={`reset-button ${Exo2.className}`}>
                  Resetear Series
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="alert-dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle className={`${zain.className}`}>
                    ¿Estás seguro?
                  </AlertDialogTitle>
                  <AlertDialogDescription className={`${lexendDeca.className}`}>
                    Esta acción no se puede deshacer. Se reiniciarán todas las
                    series completadas.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    className={`alert-dialog-cancel ${lexendDeca.className}`}
                  >
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className={`alert-dialog-action ${lexendDeca.className}`}
                    onClick={resetearDia}
                  >
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
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
                      <h3 className={`${bebasNeue.className}`}>
                        {exercise.nombre || "Ejercicio sin nombre"}
                      </h3>
                      <p
                        className={`difficulty ${zain.className} ${
                          exercise.dificultad?.toLowerCase() || "desconocida"
                        }`}
                      >
                        Dificultad: {exercise.dificultad || "No asignada"}
                      </p>
                      {/* Barra de progreso */}
                      <div className="progress-container">
                        <p
                          className={`progress-container--p ${Exo2.className}`}
                        >
                          {progress.toFixed(2)}%
                        </p>
                        <Progress value={progress.toFixed(2)} />
                        <br />
                        <p className="progress-container-series">
                          <span
                            className={`series__realizadas ${lexendDeca.className}`}
                          >
                            SERIES REALIZADAS{" "}
                            <Activity className="text-green-600 " />
                            {totalCompletedSeries}
                          </span>
                        </p>
                      </div>{" "}
                      <div className="exercise-details">
                        <Popover>
                          <span
                            className={`container__details-ejercicios ${Exo2.className}`}
                          >
                            <Repeat2 />
                            <PopoverTrigger className="bg-transparent text-white p-2 pl-1">
                              Reps: {exercise.repeticiones || "N/A"}
                            </PopoverTrigger>
                            <PopoverContent
                              side="top"
                              className="bg-[#272727] text-[#f3f3f3] text-xs text-center py-2 px-7 w-fit"
                            >
                              Repeticiones
                            </PopoverContent>
                          </span>
                        </Popover>

                        <Popover>
                          <span
                            className={`container__details-ejercicios ${Exo2.className}`}
                          >
                            <Weight />
                            <PopoverTrigger className="bg-transparent text-white p-2 pl-1">
                              {" "}
                              Carga: {exercise.carga || "N/A"}
                            </PopoverTrigger>
                            <PopoverContent
                              side="top"
                              className="bg-[#272727] text-[#f3f3f3] text-xs text-center py-2 px-7 w-fit"
                            >
                              Peso complementario
                            </PopoverContent>
                          </span>
                        </Popover>

                        <Popover>
                          <span
                            className={`container__details-ejercicios ${Exo2.className}`}
                          >
                            <TimerReset />
                            <PopoverTrigger className="bg-transparent text-white p-2 pl-0">
                              Descanso: {exercise.descanso || "N/A"}
                            </PopoverTrigger>
                            <PopoverContent
                              side="bottom"
                              className="bg-[#272727] text-[#f3f3f3] text-xs text-center py-2 px-7 w-fit"
                            >
                              Tiempo de descanso
                            </PopoverContent>
                          </span>
                        </Popover>

                        <Popover>
                          <span
                            className={`container__details-ejercicios ${Exo2.className}`}
                          >
                            <Anchor />
                            <PopoverTrigger className="bg-transparent text-white p-2 pl-1">
                              Series: {exercise.series || "N/A"}
                            </PopoverTrigger>
                            <PopoverContent
                              side="bottom"
                              className="bg-[#272727] text-[#f3f3f3] text-xs text-center py-2 px-7 w-fit"
                            >
                              Número de series
                            </PopoverContent>
                          </span>
                        </Popover>
                      </div>
                      <div className="timer-container">
                        <span className={`completed-series ${zain.className}`}>
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
                            className={`complete-button ${Exo2.className}`}
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
