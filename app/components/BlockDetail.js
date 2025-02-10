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
    <div className="block-detail p-4 bg-gray-900 text-white min-h-screen">
      {/* Botón para volver */}
      <button
        className="absolute top-2 left-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600"
        onClick={onBack}
      >
        <ArrowBack className="text-white" />
      </button>

      {/* Botón para resetear el día */}
      <button
        className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-500"
        onClick={resetearDia}
      >
        Resetear Series
      </button>

      <h2 className="text-2xl font-bold text-center mt-10">
        {block.titulo || "Bloque sin nombre"}
      </h2>
      <p className="text-gray-400 text-center mb-4">
        {block.notes || "Sin notas"}
      </p>

      {exercises.length > 0 ? (
        <ul className="space-y-6">
          {exercises.map((exercise) => {
            const videoData = exerciseVideos[String(exercise.id)];
            return (
              <div
                key={exercise.id}
                className="exercise-item bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-center">
                  {exercise.nombre || "Ejercicio sin nombre"}
                </h3>
                <p className="text-gray-400 text-sm text-left text-center">
                  Dificultad: {exercise.dificultad || "Desconocida"}
                </p>

                <div className="mt-3 flex flex-col items-center">
                  {videoData?.url ? (
                    <CustomVideoPlayer
                      src={videoData.url}
                      type={videoData.mime}
                      className="rounded-lg overflow-hidden"
                    />
                  ) : (
                    <p className="text-gray-500">No hay video disponible.</p>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2   gap-2 text-center">
                  <span className="bg-gray-700  text-left p-2 rounded">
                    Reps: {exercise.repeticiones || "N/A"}
                  </span>
                  <span className="bg-gray-700 text-left p-2 rounded">
                    Carga: {exercise.carga || "N/A"}
                  </span>
                  <span className="bg-gray-700 text-left p-2 rounded">
                    Descanso: {exercise.descanso || "N/A"}
                  </span>
                  <span className="bg-gray-700 text-left p-2 rounded">
                    Series: {exercise.series || "N/A"}
                  </span>
                </div>

                <div className="mt-4 flex flex-col items-center">
                  <Timer />
                  <span className="mt-2 text-sm text-gray-400">
                    Series Completadas: {completedSeries[exercise.id] || 0}/
                    {exercise.series || "N/A"}
                  </span>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-500"
                    onClick={() => handleCompleteSeries(exercise.id)}
                    disabled={
                      (completedSeries[exercise.id] || 0) >= exercise.series
                    }
                  >
                    Completar Serie
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          Este bloque no tiene ejercicios.
        </p>
      )}
    </div>
  );
};
export default BlockDetail;
