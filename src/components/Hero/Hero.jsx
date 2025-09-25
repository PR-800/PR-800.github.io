import "./Hero.css";
import { useScroll } from "../../hooks/useScroll";
import { useIntersectionObserver } from "../../hooks/useObserver";
import "../../hooks/fadeAnimation.css";
import { useState, useEffect } from "react";

export default function Hero({ show }) {
  const isVisible = useIntersectionObserver("hero");

  const fadeBottomFunc = (delay = "") =>
    `${isVisible ? `fade-in-bottom ${delay}` : "fade-out-bottom"}`;

  const { scrollToSection } = useScroll();

  const [cursorPosition, setCursorPosition] = useState("name");
  const [showCursor, setShowCursor] = useState(true);
  const fullName = "Titipa Eamsiriwong";
  const fullPosition = "Junior Full-Stack Developer";
  const fullDesc = [
    "Information Technology student graduate with proven skills in data-driven solutions.",
    "Experienced in full-stack development, data science, and ML solutions with teaching background.",
    "Passionate about creating user-focused, data-driven experiences.",
  ];
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [showPosition, setShowPosition] = useState(false);
  const [desc, setDesc] = useState("");
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setName(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) {
        clearInterval(timer);
        setTimeout(() => {
          setCursorPosition("position");
          setShowPosition(true);
        }, 500);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showPosition) {
      let i = 0;
      const timer = setInterval(() => {
        setPosition(fullPosition.slice(0, i + 1));
        i++;
        if (i >= fullPosition.length) {
          clearInterval(timer);
          setTimeout(() => {
            setCursorPosition("desc");
            setShowDesc(true);
          }, 1000);
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [showPosition]);

  useEffect(() => {
    if (showDesc) {
      let i = 0;

      const timer = setInterval(() => {
        setDesc(fullDesc.join("... ").slice(0, i + 1));
        i++;
        if (i >= fullDesc.join("... ").length) {
          clearInterval(timer);
          setTimeout(() => {
            setCursorPosition("desc");
          }, 1000);
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [showDesc]);

  useEffect(() => {
    if (cursorPosition !== "hidden") {
      const cursorTimer = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorTimer);
    } else {
      setShowCursor(false);
    }
  }, [cursorPosition]);

  return (
    <section id="hero" className={`hero-section ${show ? "show" : "hide"}`}>
      <div className="wave-background">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-header">
            <div className="text-center">
              <h1 className={`hero-title ${fadeBottomFunc()}`}>
                {name}
                {cursorPosition === "name" && showCursor && <span>|</span>}
              </h1>
              {showPosition && (
                <div
                  className={`hero-divider ${fadeBottomFunc("delay-200")}`}
                ></div>
              )}
              <h2 className={`hero-subtitle ${fadeBottomFunc("delay-400")}`}>
                {position}
                {cursorPosition === "position" && showCursor && <span>|</span>}
              </h2>
            </div>
          </div>

          <p className={`hero-description ${fadeBottomFunc("delay-600")}`}>
            {desc.split("... ").map((sentence, index) => (
              <span key={index}>
                {sentence}
                {index < desc.split("... ").length - 1 && (
                  <>
                    <br /> {}
                  </>
                )}
              </span>
            ))}
            {cursorPosition === "desc" && showCursor && <span>|</span>}
          </p>
        </div>
        <button
          className={`${fadeBottomFunc("delay-800")}`}
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
