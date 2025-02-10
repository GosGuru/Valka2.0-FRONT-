import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import "../scss/timer/timer.scss";

const Timer = () => {
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
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
