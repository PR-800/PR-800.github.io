import { useEffect, useState } from "react";
import "./Hero.css";
import { useScroll } from "../../hooks/useScroll";

const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.6, // Trigger when 60% of the section is visible
      }
    );

    const section = document.querySelector("#hero");
    if (section) {
      observer.observe(section);
    }

    return () => {
      section && observer.unobserve(section);
    };
  });

  return isVisible;
};

export default function Hero() {
  const isVisible = useIntersectionObserver();

  const fadeFunc = (delay = "") =>
    `${isVisible ? `fade-in ${delay}` : "fade-out"}`;

  const { scrollToSection } = useScroll();

  return (
    <section id="hero" className="hero-section">
      <div className="wave-background">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-header">
            <h1 className={`hero-title ${fadeFunc()}`}>Titipa Eamsiriwong</h1>
            <div className={`hero-divider ${fadeFunc("delay-200")}`}></div>
            <h2 className={`hero-subtitle ${fadeFunc("delay-400")}`}>
              Junior Full-Stack Developer
            </h2>
          </div>
          <p className={`hero-description ${fadeFunc("delay-600")}`}>
            First Class Software Engineering graduate with proven skills in
            data-driven solutions.
            <br /> {}
            Experienced in full-stack development, data science, and ML
            solutions with teaching background.
            <br /> {}
            Passionate about creating user-focused, data-driven experiences.
          </p>
        </div>
        <button
          className={`${fadeFunc("delay-800")}`}
          onClick={() => scrollToSection("about")}
        >
          <span className="scroll-button ">
            <ion-icon name="chevron-down" size="large"></ion-icon>
          </span>
        </button>
      </div>
    </section>
  );
}
