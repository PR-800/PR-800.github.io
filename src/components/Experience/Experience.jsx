import "./Experience.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "../../hooks/useObserver";
import { supabase } from "../../hooks/supabase";

export default function Experience({ show }) {
  const [expData, setExpData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.rpc("get_exp_data");
      const { categories, exp } = data;

      const joinTable = categories.map((category) => ({
        title: category.name,
        id: category.id,
        bg_color: category.bg_color,
        text_color: category.text_color,
        exp: exp.filter((e) => e.category_id === category.id),
      }));

      setExpData(joinTable);
    }

    loadData();
  }, []);

  const isVisible = useIntersectionObserver("experience");

  const fadeBottomFunc = (delay = "") =>
    `${isVisible ? `fade-in-bottom ${delay}` : "fade-out-bottom"}`;

  const fadeBottomHeaderFunc = () =>
    `${isVisible ? `fade-in-bottom-alt` : "fade-out-bottom-alt"}`;

  const categories = expData.map((category) => category.id);
  const allExperiences = expData.flatMap((category) =>
    category.exp.map((exp) => ({
      ...exp,
      category_name: category.title,
    }))
  );

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (expData.length > 0 && selectedCategories.length === 0) {
      setSelectedCategories(categories);
    }
  }, [expData]);

  const filteredExperiences = allExperiences.filter((exp) =>
    selectedCategories.includes(exp.category_id)
  );

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    if (!a.end_date) return -1;
    if (!b.end_date) return 1;

    return new Date(b.end_date) - new Date(a.end_date);
  });

  const categoryColors = expData.reduce((acc, category) => {
    acc[category.id] = {
      bg: category.bg_color,
      text: category.text_color,
    };
    return acc;
  }, {});

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const FilterDropdown = () => {
    return (
      <div ref={dropdownRef} className="filter-dropdown">
        <button
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
          }}
          className={`filter-button ${isFilterOpen ? "open" : ""}`}
        >
          <ion-icon name="filter-outline"></ion-icon>
          <span>Filter</span>
        </button>

        {isFilterOpen && (
          <div className="filter-menu">
            <div className="filter-menu-options">
              {expData.map((category) => (
                <label key={category.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <span>{category.title}</span>
                  <span className="count">({category.exp.length})</span>
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
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${month} ${year}`;
  };

  return (
    <section
      id="experience"
      className={`exp-section ${show ? "show" : "hide"}`}
    >
      <div className={`container`}>
        <div className={`section-header ${fadeBottomHeaderFunc()}`}>
          <div>
            <h2 className="section-title">Experiences</h2>
            <p className="text-gray-600">
              {filteredExperiences.length} of {allExperiences.length}{" "}
              experiences shown
            </p>
          </div>
        </div>

        <div className={`content-wrapper ${fadeBottomHeaderFunc()}`}>
          <FilterDropdown />
          <div className={`${fadeBottomFunc()}`}>
            {sortedExperiences.map((experience, index) => (
              <div
                className={`exp-item ${fadeBottomFunc()} `}
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
                          color: categoryColors[experience.category_id].text,
                        }}
                      >
                        {experience.company}
                      </div>
                      <div
                        className="category"
                        style={{
                          color: categoryColors[experience.category_id].text,
                          backgroundColor:
                            categoryColors[experience.category_id].bg,
                        }}
                      >
                        {experience.category_name}
                      </div>
                      <div className="location">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>{experience.location}</span>
                      </div>
                      <div className="duration">
                        <ion-icon name="calendar-clear-outline"></ion-icon>
                        <span>
                          {formatDate(experience.start_date)} -{" "}
                          {formatDate(experience.end_date)}
                        </span>
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
                                categoryColors[experience.category_id].bg,
                            }}
                          ></span>
                          <span className="bullet-text">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="technologies-section">
                    {/* <h4 className="technologies-title">Tags</h4> */}
                    <div className="technologies-list">
                      {experience.tags.map((tech, index) => (
                        <span
                          className="tech-tag"
                          key={index}
                          style={{
                            color: categoryColors[experience.category_id].text,
                            backgroundColor:
                              categoryColors[experience.category_id].bg,
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
      </div>
    </section>
  );
}
