import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import "../scss/timer/timer.scss";

const detectOS = () => {
  const userAgent =
    window.navigator.userAgent || window.navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return "Android";
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }
  return "Other";
};

const openClockApp = (seconds) => {
  const os = detectOS();
  if (os === "Android") {
    window.location.href = `intent:#Intent;action=android.intent.action.SET_TIMER;S.seconds=${seconds};end`;
  } else if (os === "iOS") {
    alert(
      "Por favor, abre la app de reloj y configura el temporizador manualmente."
    );
  } else {
    alert("Este dispositivo no soporta la integración con la app de reloj.");
  }
};

const Timer = ({ restTime }) => {
  const [time, setTime] = useState(0); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(false); // Estado del cronómetro

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Formatear el tiempo en minutos y segundos (0.00)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}.${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="timer-container">
      <p className="timer-display">{formatTime(time)}</p>
      <div className="timer-buttons">
        {isRunning ? (
          <button
            className="timer-button stop"
            onClick={() => setIsRunning(false)}
          >
            <Pause size={20} />
          </button>
        ) : (
          <>
            <button
              className="timer-button start"
              onClick={() => setIsRunning(true)}
            >
              <Play size={20} />
            </button>
            {time > 0 && (
              <button
                className="timer-button reset"
                onClick={() => {
                  setTime(0);
                  setIsRunning(false);
                }}
              >
                <RotateCcw size={20} />
              </button>
            )}
            {/* Botón para configurar el temporizador en el móvil */}
            <button
              className="timer-button clock"
              onClick={() => openClockApp(restTime)}
            >
              Abrir app de reloj
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
