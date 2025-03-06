import React, { useRef, useState, useEffect } from "react";
import "../scss/Video/videoStyle.scss";
import MinimalPlayPauseButton from "../../components/ui/minimal-play-pause-button";

const CustomVideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("CustomVideoPlayer - src:", src, "type:", type);
  }, [src, type]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      // Reiniciamos el estado al cambiar el src
      videoRef.current.pause();
      setIsPlaying(false);
      setIsLoading(true);
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("AutoPlay error:", error);
          setIsPlaying(false);
        });
    }
  }, [src]);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Play error:", error);
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`video-container ${isPlaying ? "expanded" : ""}`}
      onClick={togglePlayPause}
    >
      <video
        ref={videoRef}
        preload="metadata"
        muted
        loop
        autoPlay
        className="video-player"
        onCanPlay={() => setIsLoading(false)}
      >
        <source src={src} type={type} />
        Tu navegador no soporta la reproducción de este video.
      </video>
      {isLoading && <div className="loading-spinner">Loading...</div>}
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
