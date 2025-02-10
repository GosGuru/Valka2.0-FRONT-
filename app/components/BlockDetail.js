import React, { useState, useEffect } from "react";
import { getEjercicios } from "../api/getEjercicios";
import { getEjercicioConVideo } from "../api/getEjerciciosVideo";
import { ENV } from "../utils";
import { Reorder, FitnessCenter, Timer, ArrowBack } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "../styles/blockDetail.css";
// import "../scss/Video/videoStyle.scss";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";

const BlockDetail = ({ block, onBack }) => {
  const [exercises, setExercises] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState({}); // Mapea id -> { url, mime }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);

        // Obtener los ejercicios asociados al bloque (usando el ID de la rutina)
        const fetchedExercises = await getEjercicios(block.id);
        setExercises(fetchedExercises);

        // Para cada ejercicio obtenemos su video (si tiene)
        const videoPromises = fetchedExercises.map((exercise) =>
          getEjercicioConVideo(exercise.id)
        );
        const videos = await Promise.all(videoPromises);

        // Mapear los videos por el ID del ejercicio (convirtiendo el id a string)
        const videosMap = videos.reduce((acc, video) => {
          acc[String(video.id)] = video.videoURL;
          return acc;
        }, {});
        setExerciseVideos(videosMap);
        console.log("Mapping de videos:", videosMap);
      } catch (err) {
        setError(err.message || "Ocurrió un error desconocido.");
      } finally {
        setLoading(false);
      }
    };

    if (block.id) {
      fetchExercises();
    } else {
      setLoading(false);
    }
  }, [block.id]);

  const handleBack = () => {
    window.location.reload();
  };

  const getDifficultyClass = (dificultad) => {
    switch (dificultad) {
      case "Avanzado":
        return "difficulty-advanced";
      case "Intermedio":
        return "difficulty-intermediate";
      case "Principiante":
      default:
        return "difficulty-beginner";
    }
  };

  if (loading) return <p className="text-center text-gray-400">Cargando...</p>;
  if (error)
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
        <button onClick={onBack} className="text-blue-500 underline">
          Volver
        </button>
      </div>
    );

  return (
    <div className="block-detail">
      <button className="sticky top-2" onClick={handleBack}>
        <ArrowBack className="text-blue-600 hover:bg-slate-600  backdrop-opacity-50 p-1 rounded-full" />
      </button>
      <h2 className="block-title">{block.titulo || "Bloque sin nombre"}</h2>
      <p className="block-notes">{block.notes || "Sin notas"}</p>
      {exercises.length > 0 ? (
        <ul className="exercise-list">
          {exercises.map((exercise) => {
            // Convertimos el id a string para el mapping
            const videoData = exerciseVideos[String(exercise.id)];
            return (
              <div key={exercise.id} className="exercise-item">
                <div className="exercise-video">
                  {videoData?.url ? (
                    <CustomVideoPlayer
                      src={videoData.url}
                      type={videoData.mime || "video/mp4"}
                    />
                  ) : (
                    <p>No hay video disponible para este ejercicio.</p>
                  )}
                </div>
                <div className="exercise-details">
                  <span className="exercise-reps">
                    {exercise.repeticiones || "N/A"} reps
                  </span>
                  <span
                    className={`exercise-difficulty ${getDifficultyClass(
                      exercise.dificultad
                    )}`}
                  >
                    {exercise.dificultad || "Principiante"}
                  </span>
                  <p className="exercise-name">
                    {exercise.nombre || "Ejercicio sin nombre"}
                  </p>
                  <div className="container__series--carga">
                    <span className="exercise-series">
                      <Reorder style={{ marginRight: "5px" }} />
                      {exercise.series || "N/A"}
                    </span>
                    <span className="exercise-carga">
                      <FitnessCenter style={{ marginRight: "5px" }} />
                      {exercise.carga || "N/A"}
                    </span>
                    <span className="exercise-descanso">
                      <Timer style={{ marginRight: "5px" }} />
                      {exercise.descanso || "N/A"} s
                    </span>
                    <span className="exercise-blockTime">
                      <AccessTimeIcon style={{ marginRight: "5px" }} />
                      {exercise.tiempoBloque || "N/A"} s
                    </span>
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
