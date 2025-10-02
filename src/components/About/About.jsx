import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./About.css";
import { useScroll } from "../../hooks/useScroll";
import { useIntersectionObserver } from "../../hooks/useObserver";
import "../../hooks/fadeAnimation.css";
import profileImage from "/assets/profileImg2.png";
// import profileImage from "/assets/grey.png";

export default function About({ show }) {
  const visibleHighlights = [
    {
      text: "A full-stack developer with Data Science expertise",
    },
    {
      text: "Proficient across multiple programming languages & frameworks",
    },
    {
      text: "Delivered predictive maintenance solutions for Toyota facilities, achieving 97% accuracy in prod-level ML application testing.",
    },
  ];

  const hiddenHighlights = [
    {
      text: "Mentored 100+ students across multiple teaching assistant roles",
    },
    {
      text: "Strong English communication skills (TOEIC 840)",
    },
  ];

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVisible = useIntersectionObserver("about");

  const fadeTopFunc = (delay = "") =>
    `${isVisible ? `fade-in-top ${delay}` : "fade-out-top"}`;

  const fadeBottomFunc = (delay = "") =>
    `${isVisible ? `fade-in-bottom ${delay}` : "fade-out-bottom"}`;

  const fadeLeftFunc = (delay = "") =>
    `${isVisible ? `fade-in-left ${delay}` : "fade-out-left"}`;

  const fadeRightFunc = (delay = "") =>
    `${isVisible ? `fade-in-right ${delay}` : "fade-out-right"}`;

  const { scrollToSection } = useScroll();

  const [isExpanded, setIsExpanded] = useState(false);
  const [hiddenHeight, setHiddenHeight] = useState(0);
  const [visibleHeight, setVisibleHeight] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const [isSecretCard, setIsSecretCard] = useState(false);

  // Get visible highlight height on mount
  useEffect(() => {
    const visibleSection = document.querySelector(".visible-highlights");
    if (visibleSection) {
      const actualHeight = visibleSection.scrollHeight; // Use scrollHeight for full content height
      setVisibleHeight(actualHeight);
    }
  }, []);

  const toggleExpansion = () => {
    const button = document.querySelector(".expand-button");
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      button.textContent = "Show less";

      // Check hidden highlight height
      setTimeout(() => {
        const hiddenSection = document.querySelector(".hidden-highlights");
        if (hiddenSection) {
          const actualHeight = hiddenSection.scrollHeight; // Use scrollHeight for full content height
          setHiddenHeight(actualHeight);
        }
      }, 50);
    } else {
      button.textContent = `+ ${hiddenHighlights.length} more skills`;

      // reset hidden height
      setHiddenHeight(0);
    }
  };

  const totalHeight = visibleHeight + hiddenHeight + 32 + 16;

  return (
    <section id="about" className={`about-section ${show ? "show" : "hide"}`}>
      <div className="about-container">
        <div className="education-grid">
          <div
            className={`education-label ${
              isMobile ? fadeBottomFunc() : fadeRightFunc()
            }`}
          >
            Education
          </div>
          <div className={`${isMobile ? fadeLeftFunc() : fadeTopFunc()}`}>
            <div className={`education-divider`}></div>
          </div>

          <div className="education-content">
            <div className={`${isMobile ? fadeTopFunc() : fadeLeftFunc()}`}>
              <h3 className="degree-title">
                Bachelor of Science Program in Information Technology
              </h3>
              <p className="university">
                King Mongkut's Institute of Technology Ladkrabang (KMITL),
                Bangkok
              </p>
              <span className="honors">CGPA: 3.54 | First Class Honors</span>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Graduation</span>
                  <span className="detail-value">2025</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Subject Area</span>
                  <span className="detail-value">Software Engineering</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Specialization</span>
                  <span className="detail-value">
                    Web Development
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    Experiences{" "}
                    <button onClick={() => scrollToSection("experience")}>
                      <ion-icon name="open-outline"></ion-icon>
                    </button>
                  </span>
                  <span className="detail-value">
                    Teaching Assistant, Co-op Intern
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid ${fadeBottomFunc()}`}>
          <div className="photo-section">
            <div
              className={`photo-placeholder ${isSecretCard ? "secret" : ""}`}
            >
              <img src={profileImage} />
              {isSecretCard && (
                <div className="floating-circles">
                  <img src="/assets/black.png" className="circle circle-1" />
                  <img src="/assets/black.png" className="circle circle-2" />
                  <img src="/assets/black.png" className="circle circle-3" />
                </div>
              )}
            </div>
            {/* <ion-icon
              name={isSecretCard ? "gift" : "sparkles"}
              onClick={setIsSecretCard(!isSecretCard)}
              className={`secret-button`}
            ></ion-icon> */}
          </div>

          <div>
            <div className="tab-navigation">
              <button
                className={`tab ${activeTab === "info" ? "active" : ""}`}
                onClick={() => setActiveTab("info")}
              >
                About me
              </button>
              <button
                className={`tab ${activeTab === "highlights" ? "active" : ""}`}
                onClick={() => setActiveTab("highlights")}
              >
                Key Highlights
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "highlights" && (
                <div className="highlights-section">
                  <div style={{ minHeight: `${totalHeight}px` }}>
                    <div className="visible-highlights">
                      {visibleHighlights.map((highlight, index) => (
                        <div
                          key={index}
                          className={`highlight-item ${fadeBottomFunc()}`}
                          style={{
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <div className="highlight-dot"></div>
                          <p className="highlight-text">{highlight.text}</p>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`hidden-highlights ${
                        isExpanded ? "expanded" : ""
                      }`}
                    >
                      {hiddenHighlights.map((highlight, index) => (
                        <div
                          key={`${isExpanded}-${index}`}
                          className={`highlight-item ${
                            isExpanded ? fadeBottomFunc() : ""
                          }}`}
                          style={{
                            animationDelay: `${
                              (visibleHighlights.length + index) * 0.1
                            }s`,
                          }}
                        >
                          <div className="highlight-dot"></div>
                          <p className="highlight-text">{highlight.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="expand-button" onClick={toggleExpansion}>
                    + {hiddenHighlights.length} more skills
                  </button>
                </div>
              )}

              {activeTab === "info" && (
                <div className={`about-me ${fadeBottomFunc()}`}>
                  <div className="about-me-content">
                    <p
                      style={{ marginBottom: "8px" }}
                    >
                      Hello, I’m Titipa E.
                    </p>
                    I have experience in{" "}
                    <span className="keyword">
                      full-stack development, data science, and ML solutions
                    </span>
                    , with a strong background in teaching. Currently, I work as
                    a part-time TA at my college, support external tech training
                    programs, and work on some independent projects.
                    {/* <span>&emsp;&emsp;&emsp;</span>I thrive on solving{" "}
                    <span className="keyword">
                      complex technical challenges
                    </span>{" "}
                    and turning ambitious ideas into working solutions. When
                    faced with unfamiliar territory, I{" "}
                    <span className="keyword">dive deep and learn fast</span>. I
                    believe the best solutions come from curiosity, persistence,
                    and clear communication. */}
                  </div>
                  {/* <div class="orbit-system">
                    <div class="orbit orbit-1">
                      <div class="planet"></div>
                    </div>
                    <div class="orbit orbit-2">
                      <div class="planet planet-2"></div>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
