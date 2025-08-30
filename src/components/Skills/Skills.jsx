import "./Skills.css";
import { useIntersectionObserver } from "../../hooks/useObserver";
import "../../hooks/fadeAnimation.css";

export default function Skills() {
  const skills = [
    {
      icon: "/assets/logo_python.png",
      title: "Python",
      description: "3+ years experience",
    },
    {
      icon: "/assets/logo_javascript.png",
      title: "JavaScript",
      description: "3+ years experience in data analysis and programming",
    },
    {
      icon: "/assets/logo_htmlcss.png",
      title: "HTML/CSS",
      description: "3+ years experience in data analysis and programming",
    },
    {
      icon: "/assets/logo_sql.png",
      title: "SQL query",
      description: "3+ years experience in data analysis and programming",
    },
    {
      icon: "/assets/logo_htmlcss.png",
      title: "HTML/CSS",
      description: "3+ years experience in data analysis and programming",
    },
  ];

  const miniSkills = [
    {
      icon: "/assets/logo_cc++.png",
      title: "C/C++",
      description: "3+ years experience",
    },
    {
      icon: "/assets/logo_java.png",
      title: "Java",
      description: "3+ years experience in data analysis and programming",
    },
    {
      icon: "/assets/logo_python.png",
      title: "mini Python",
      description: "3+ years experience in data analysis and programming",
    },
    {
      icon: "/assets/logo_python.png",
      title: "mini Python",
      description: "3+ years experience",
    },
    {
      icon: "/assets/logo_python.png",
      title: "mini Python",
      description: "3+ years experience in data analysis and programming",
    },
    {
      icon: "/assets/logo_python.png",
      title: "mini Python",
      description: "3+ years experience in data analysis and programming",
    },
  ];

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        {
          name: "JavaScript",
          level: "expert",
          src: "/assets/logo_javascript.png",
        },
        { name: "HTML/CSS", level: "expert", src: "/assets/logo_htmlcss.png" },
        { name: "React", level: "expert", src: "/assets/logo_react.png" },
        { name: "Vue.js", level: "familiar", src: "/assets/logo_vue.png" },
        { name: "Svelte", level: "familiar", src: "/assets/logo_svelte.png" },
        {
          name: "Bootstrap",
          level: "familiar",
          src: "/assets/logo_bootstrap.png",
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Python", level: "expert", src: "/assets/logo_python.png" },
        { name: "C/C++", level: "familiar", src: "/assets/logo_cc++.png" },
        { name: "Node.js", level: "familiar", src: "/assets/logo_nodejs.png" },
        { name: "Java", level: "familiar", src: "/assets/logo_java.png" },
        { name: "Flask", level: "expert", src: "/assets/logo_flask.png" },
        {
          name: "RESTful API",
          level: "familiar",
          src: "/assets/logo_restfulapi.png",
        },
      ],
    },
    {
      title: "Database & Big Data",
      skills: [
        // { name: "SQL Query", level: "expert", src: "/assets/logo_sql.png" },
        { name: "MySQL", level: "expert", src: "/assets/logo_mysql.png" },
        {
          name: "PostgreSQL",
          level: "expert",
          src: "/assets/logo_postgresql.png",
        },
        {
          name: "Firebase",
          level: "expert",
          src: "/assets/logo_firebase.png",
        },
        {
          name: "Apache Spark",
          level: "expert",
          src: "/assets/logo_apachespark.png",
        },
      ],
    },
    {
      title: "Data Science & ML",
      skills: [
        {
          name: "Scikit-learn",
          level: "expert",
          src: "/assets/logo_scikitlearn.png",
        },
        {
          name: "Matplotlib",
          level: "familiar",
          src: "/assets/logo_matplotlib.png",
        },
        {
          name: "Seaborn",
          level: "familiar",
          src: "/assets/logo_seaborn.png",
        },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        {
          name: "Visual Studio Code",
          level: "expert",
          src: "/assets/logo_vscode.png",
        },
        { name: "Git", level: "expert", src: "/assets/logo_git.png" },
        { name: "GitHub", level: "expert", src: "/assets/logo_github.png" },
        { name: "Postman", level: "familiar", src: "/assets/logo_postman.png" },
        { name: "Figma", level: "familiar", src: "/assets/logo_figma.png" },
      ],
    },
  ];

  const isVisible = useIntersectionObserver("skills");

  const fadeBottomFunc = (delay = "") =>
    `${isVisible ? `fade-in-bottom ${delay}` : "fade-out-bottom"}`;

  const getLevelColor = (level) => {
    return level === "expert"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-gray-100 text-gray-600 border-gray-200";
  };

  const getLevelText = (level) => {
    return level === "expert" ? "Expert" : "Familiar";
  };

  return (
    <section id="skills" className="skill-section">
      <div className="skill-container">
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div
              key={index}
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
                      animationDelay: `${index * 0.1 + index * 0.05}s`,
                    }}
                  >
                    <div className="skill-content">
                      <span className="skill-header">
                        <span className="skill-icon">
                          <img src={skill.src} />
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
