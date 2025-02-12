// pages/ejercicio/[id].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Si usas Next.js clásico, usa next/router

const ExerciseDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Captura el id desde la URL
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    if (id) {
      // Aquí puedes hacer una llamada a la API para obtener los datos del ejercicio
      // Por simplicidad, simulamos una respuesta:
      const fetchExerciseDetail = async () => {
        // Simula la llamada a la API. Reemplaza esto por tu lógica real.
        const data = {
          id,
          nombre: "Ejercicio " + id,
          series: 3,
          repeticiones: 12,
          carga: "20kg",
          // … otros campos
        };
        setExercise(data);
      };

      fetchExerciseDetail();
    }
  }, [id]);

  if (!exercise) {
    return <div>Cargando ejercicio...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{exercise.nombre}</h1>
      <p>Series: {exercise.series}</p>
      <p>Repeticiones: {exercise.repeticiones}</p>
      <p>Carga: {exercise.carga}</p>
      {/* Puedes agregar más detalles o componentes aquí */}
    </div>
  );
};

export default ExerciseDetailPage;
