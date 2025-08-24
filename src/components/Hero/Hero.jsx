import "./Hero.css";
import { useScroll } from "../../hooks/useScroll";
import { useIntersectionObserver } from "../../hooks/useObserver";
import "../../hooks/fadeAnimation.css";

export default function Hero() {
  const isVisible = useIntersectionObserver("hero");

  const fadeBotttomFunc = (delay = "") =>
    `${isVisible ? `fade-in-bottom ${delay}` : "fade-out-bottom"}`;

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
            <h1 className={`hero-title ${fadeBotttomFunc()}`}>Titipa Eamsiriwong</h1>
            <div className={`hero-divider ${fadeBotttomFunc("delay-200")}`}></div>
            <h2 className={`hero-subtitle ${fadeBotttomFunc("delay-400")}`}>
              Junior Full-Stack Developer
            </h2>
          </div>
          <p className={`hero-description ${fadeBotttomFunc("delay-600")}`}>
            Information Technology student graduate with proven skills in
            data-driven solutions.
            <br /> {}
            Experienced in full-stack development, data science, and ML
            solutions with teaching background.
            <br /> {}
            Passionate about creating user-focused, data-driven experiences.
          </p>
        </div>
        <button
          className={`${fadeBotttomFunc("delay-800")}`}
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
