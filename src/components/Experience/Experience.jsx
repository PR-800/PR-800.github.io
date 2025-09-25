import "./Experience.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "../../hooks/useObserver";

export default function Experience({ show }) {
  const experiences = [
    {
      title: "Cooperative Education",
      company: "Toyota Motor Thailand Co., Ltd. (TMT)",
      category: "Professional Experience",
      location: "Bangkok, Thailand",
      duration: "Jun 2024 - Oct 2024",
      description: [
        "Led end-to-end development of predictive maintenance system using Machine Learning",
        "Deployed and tested web application prototype in real manufacturing environment",
        "Achieved 97.92% accuracy in predictive analytics for production line optimization",
      ],
      technologies: [
        "Python",
        "Flask",
        "Machine Learning",
        "Scikit-learn",
        "HTML/CSS",
        "JavaScript",
        "PostgreSQL",
      ],
      comment:
        "First industry experience! Seeing my ML model work in a real Toyota factory was incredible.",
      sticker: "🚗",
    },
    {
      title: "Teaching Assistant - Data Analytics & Visualization",
      company: "KMITL Professional Training Program",
      category: "Professional Training",
      location: "Bangkok, Thailand",
      duration: "May 2025 - Jul 2025",
      description: [
        "Supported government officers in professional training program with programming tasks",
        "Provided consultation on system optimization for internal government operations",
        "Delivered feedback and insights during project presentations",
        "Bridged technical concepts with practical government applications",
      ],
      technologies: [
        "Python",
        "Data Visualization",
        "Matplotlib",
        "Statistical Analysis",
      ],
      comment:
        "Teaching government officers taught me to explain complex tech in simple terms!",
      sticker: "👨‍🏫",
    },
    {
      title: "Teaching Assistant - Big Data Systems",
      company: "King Mongkut's Institute of Technology Ladkrabang",
      category: "Academic Teaching",
      location: "Bangkok, Thailand",
      duration: "Dec 2024 - May 2025",
      description: [
        "Guided 3rd year IT students in PySpark and Spark SQL lab sessions",
        "Taught large-scale data processing and visualization techniques",
        "Helped students understand distributed computing concepts",
        "Facilitated hands-on implementation of big data solutions",
      ],
      technologies: [
        "PySpark",
        "Spark SQL",
        "Python",
        "Big Data",
        "Data Processing",
      ],
      comment:
        "Watching students' 'aha' moments with big data processing was amazing!",
      sticker: "📊",
    },
    {
      title: "Teaching Assistant - Data Structures & Algorithms",
      company: "King Mongkut's Institute of Technology Ladkrabang",
      category: "Academic Teaching",
      location: "Bangkok, Thailand",
      duration: "Dec 2024 - May 2025",
      description: [
        "Guided 1st year Financial Engineering students on fundamental programming concepts",
        "Taught custom implementations of Arrays, Linked Lists, Stacks, and Queues",
        "Focused on building strong problem-solving foundations",
        "Mentored students through algorithmic thinking processes",
      ],
      technologies: [
        "Java",
        "C/C++",
        "Data Structures",
        "Algorithms",
        "Problem Solving",
      ],
      comment:
        "My first teaching role! Students' creative questions kept me on my toes.",
      sticker: "🌱",
    },
  ];

  const categories = [
    "Professional Experience",
    "Professional Training",
    "Academic Teaching",
  ];

  const categoryColors = {
    "Professional Experience": { bg: "#DBEAFE", text: "#1E3A8A" },
    "Professional Training": { bg: "#e3e6fcff", text: "#1e298aff" },
    "Academic Teaching": { bg: "#dcf5f9ff", text: "#0C4A6E" },
  };

  const isVisible = useIntersectionObserver("experience");

  const fadeBottomFunc = (delay = "") =>
    `${isVisible ? `fade-in-bottom ${delay}` : "fade-out-bottom"}`;

  const fadeBottomHeaderFunc = () =>
    `${isVisible ? `fade-in-bottom-alt` : "fade-out-bottom-alt"}`;

  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredExperiences = experiences.filter((exp) =>
    selectedCategories.includes(exp.category)
  );

  const handleCategoryToggle = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category) // เช็คว่า category ที่คลิกอยู่ใน state เก่าไหม
          ? prev.filter((c) => c !== category) // เอา category นั้นออกไป
          : [...prev, category] // สร้าง array ใหม่ >> เพิ่ม category นั้นเข้าไปกับอันเดิม
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section
      id="experience"
      className={`exp-section ${
        show ? "show" : "hide"
      }`}
    >
      <div className={`container`}>
        <div className={`section-header ${fadeBottomHeaderFunc()}`}>
          <div>
            <h2 className="section-title">Experiences</h2>
            <p className="text-gray-600">
              {filteredExperiences.length} of {experiences.length} experiences
              shown
            </p>
          </div>

          <div ref={dropdownRef} className="filter-dropdown">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`filter-button ${isFilterOpen ? "open" : ""}`}
            >
              <ion-icon name="filter-outline"></ion-icon>
              <span>Filter</span>
            </button>

            {isFilterOpen && (
              <div className="filter-menu">
                <div className="filter-menu-options">
                  {categories.map((category) => (
                    <label key={category} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      <span>{category}</span>
                      <span className="count">
                        (
                        {
                          experiences.filter((exp) => exp.category === category)
                            .length
                        }
                        )
                      </span>
                    </label>
                  ))}
                </div>
                <div className="filter-menu-actions">
                  <button onClick={() => setSelectedCategories(categories)}>
                    Select All
                  </button>
                  <button onClick={() => setSelectedCategories([])}>
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`${fadeBottomFunc()}`}>
          {filteredExperiences.map((experience, index) => (
            <div
              className={`exp-item ${fadeBottomFunc()}`}
              style={{
                animationDelay: `${index * 0.1 + index * 0.05}s`,
              }}
              key={index}
            >
              <div className="exp-card">
                <div className="timeline-dot"></div>
                <div className="card-header">
                  <div className="job-info">
                    <h3 className="job-title">
                      {experience.title}
                      <div className="comment-container">
                        <a className={`comment-button tooltip-${index}`}>
                          <ion-icon name="chatbubble-outline"></ion-icon>
                        </a>
                        <Tooltip
                          anchorSelect={`.tooltip-${index}`}
                          place="left"
                          style={{
                            maxWidth: "min(280px, calc(100vw - 40px))", // Responsive to screen size
                            fontWeight: "400",
                            fontSize: "14px",
                            lineHeight: "1.4",
                            borderRadius: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              marginTop: "8px",
                              marginBottom: "8px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "18px",
                                animation: "bounce 2s infinite",
                              }}
                            >
                              {experience.sticker}
                            </span>
                            <span
                              style={{
                                fontStyle: "italic",
                              }}
                            >
                              "{experience.comment}"
                            </span>
                          </div>
                        </Tooltip>
                      </div>
                    </h3>
                    <div
                      className="company-name"
                      style={{
                        color: categoryColors[experience.category].text,
                      }}
                    >
                      {experience.company}
                    </div>
                    <div
                      className="category"
                      style={{
                        color: categoryColors[experience.category].text,
                        backgroundColor: categoryColors[experience.category].bg,
                      }}
                    >
                      {experience.category}
                    </div>
                    <div className="location">
                      <ion-icon name="location-outline"></ion-icon>
                      <span>{experience.location}</span>
                    </div>
                    <div className="duration">
                      <ion-icon name="calendar-clear-outline"></ion-icon>
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <ul>
                    {experience.description.map((bullet, index) => (
                      <li key={index} className="bullet-item">
                        <span
                          className="bullet-dot"
                          style={{
                            backgroundColor:
                              categoryColors[experience.category].bg,
                          }}
                        ></span>
                        <span className="bullet-text">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="technologies-section">
                  <h4 className="technologies-title">Technologies</h4>
                  <div className="technologies-list">
                    {experience.technologies.map((tech, index) => (
                      <span
                        className="tech-tag"
                        key={index}
                        style={{
                          color: categoryColors[experience.category].text,
                          backgroundColor:
                            categoryColors[experience.category].bg,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredExperiences.length === 0 && (
            <div className="no-experiences">
              <p className="no-experiences-text">
                No experiences match the selected filters.
              </p>
              <button
                className="show-all-btn"
                onClick={() => setSelectedCategories(categories)}
              >
                Show All Experiences
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
