import "./Skills.css";
import { useIntersectionObserver } from "../../hooks/useObserver";
import "../../hooks/fadeAnimation.css";
import { supabase } from "../../hooks/supabase";
import { useEffect, useState } from "react";

export default function Skills() {
  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.rpc("get_portfolio_data");

      const { categories, skills } = data;

      const joinTable = categories.map((category) => ({
        title: category.name,
        id: category.id,
        skills: skills.filter((s) => s.category_id === category.id),
      }));

      setSkillData(joinTable);
    }

    loadData();
  }, []);

  const isVisible = useIntersectionObserver("skills");

  const fadeBottomFunc = (delay = "") =>
    `${isVisible ? `fade-in-bottom ${delay}` : "fade-out-bottom"}`;

  const getLevelColor = (level) => {
    return level === 2
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-gray-100 text-gray-600 border-gray-200";
  };

  const getLevelText = (level) => {
    return level === 2 ? "Expert" : "Familiar";
  };

  return (
    <section id="skills" className="skill-section">
      <div className="skill-container">
        <div className="skills-grid">
          {skillData.map((category) => (
            <div
              key={category.id}
              className={`skill-category-card ${fadeBottomFunc()}`}
            >
              <div className="category-header">
                <h3 className="category-title">{category.title}</h3>
                <div className="category-divider"></div>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`skill-item ${fadeBottomFunc()}`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    <div className="skill-content">
                      <span className="skill-header">
                        <span className="skill-icon">
                          <img
                            src={`${
                              import.meta.env.VITE_SUPABASE_URL
                            }/storage/v1/object/public${skill.src}`}
                          />
                        </span>
                        <span className="skill-name">{skill.name}</span>
                      </span>
                      {/* <span
                        className={`skill-level ${getLevelColor(skill.level)}`}
                      >
                        {getLevelText(skill.level)}
                      </span> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
