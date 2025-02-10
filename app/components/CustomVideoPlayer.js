import React, { useRef, useState } from "react";
import "../scss/Video/videoStyle.scss"; // Aquí irán los estilos personalizados
import MinimalPlayPauseButton from "../../components/ui/minimal-play-pause-button";

const CustomVideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="video-container" onClick={togglePlayPause}>
      <video
        ref={videoRef}
        src={src}
        type={type}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        className="video-player"
      />
      {/* Capa degradada para mejorar la legibilidad */}
      <div className="video-overlay" />
      {/* Usamos el nuevo botón minimalista */}
      <div className="video-controls">
        <MinimalPlayPauseButton
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
        />
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
