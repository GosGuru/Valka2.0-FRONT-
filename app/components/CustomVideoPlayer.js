import React, { useRef, useState } from "react";
import "../scss/Video/videoStyle.scss";
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
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        className="video-player"
      >
        <source src={src} type={type} />
        {/* Mensaje alternativo para navegadores que no soportan video */}
        Tu navegador no soporta la reproducción de este video.
      </video>
      {/* Capa degradada para mejorar la legibilidad */}
      <div className="video-overlay" />
      {/* Controles minimalistas */}
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
