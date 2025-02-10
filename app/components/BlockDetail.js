import React, { useState, useEffect } from "react";
import { getEjercicios } from "../api/getEjercicios";
import { getEjercicioConVideo } from "../api/getEjerciciosVideo";
import { ENV } from "../utils";
import {
  Reorder,
  FitnessCenter,
  Timer as TimerIcon,
  ArrowBack,
} from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "../styles/blockDetail.css";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { useRouter } from "next/navigation";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorageHelper";
import Timer from "./Timer"; // Importamos el cronómetro

const BlockDetail = ({ block, onBack }) => {
  const [exercises, setExercises] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState({});
  const [completedSeries, setCompletedSeries] = useState({});

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

        // Cargar progreso de series desde localStorage
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

  // Función para resetear el día
  const resetearDia = () => {
    localStorage.removeItem("completedSeries");
    setCompletedSeries({});
    alert("Progreso del día reiniciado.");
  };

  // Función para completar una serie
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

  return (
    <div className="block-detail">
      {/* Botón para volver */}
      <button className="sticky top-1 right-1" onClick={onBack}>
        <ArrowBack className="text-blue-600 hover:bg-slate-600 backdrop-opacity-50 p-1 rounded-full" />
      </button>

      {/* Botón para resetear el día */}
      <button
        className="absolute top-2 right-1 bg-green-800 text-white px-2 py-1 rounded-md ml-1"
        onClick={resetearDia}
      >
        Resetear Series
      </button>

      <h2 className="block-title">{block.titulo || "Bloque sin nombre"}</h2>
      <p className="block-notes">{block.notes || "Sin notas"}</p>

      {exercises.length > 0 ? (
        <ul className="exercise-list">
          {exercises.map((exercise) => {
            const videoData = exerciseVideos[String(exercise.id)];
            return (
              <div key={exercise.id} className="exercise-item">
                <div className="exercise-video">
                  {videoData?.url ? (
                    <CustomVideoPlayer
                      src={videoData.url}
                      type={videoData.mime}
                    />
                  ) : (
                    <p>No hay video disponible para este ejercicio.</p>
                  )}
                </div>
                <div className="exercise-details">
                  <span className="exercise-reps">
                    {exercise.repeticiones || "N/A"} reps
                  </span>
                  <p className="exercise-name">
                    {exercise.nombre || "Ejercicio sin nombre"}
                  </p>
                  <div className="container__series--carga">
                    {/* Cronómetro */}
                    <div className="timer-wrapper">
                      <Timer />
                    </div>
                    <span className="exercise-series">
                      {completedSeries[exercise.id] || 0}/
                      {exercise.series || "N/A"}
                    </span>

                    <button
                      className="complete-series-button"
                      onClick={() => handleCompleteSeries(exercise.id)}
                      disabled={
                        (completedSeries[exercise.id] || 0) >= exercise.series
                      }
                    >
                      Completar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      ) : (
        <p className="no-exercises-text">Este bloque no tiene ejercicios.</p>
      )}
    </div>
  );
};

export default BlockDetail;
