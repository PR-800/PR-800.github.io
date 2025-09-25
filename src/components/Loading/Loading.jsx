import { useState, useEffect } from "react";
import "./Loading.css";

export default function Loading({
  duration,
  primaryColor,
  onComplete = () => {},
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 0.8;
      });
    }, duration / 125);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`loading-section ${isVisible ? "show" : "hide"}`}>
      <div className="loading-container">
        <div className="loading-animation">
          <div
            className="loading-shape"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        <div className="loading-content">
          <h2 className="loading-text">Compiling portfolio...</h2>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  backgroundColor: primaryColor,
                  width: `${progress}%`,
                  boxShadow: `0 0 10px ${primaryColor}40`,
                }}
              />
            </div>
            <p className="progress-text">{Math.floor(progress)}% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
