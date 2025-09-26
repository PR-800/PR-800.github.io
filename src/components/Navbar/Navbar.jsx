import { useScroll } from "../../hooks/useScroll";
import "./Navbar.css";

export default function Navbar({ show }) {
  const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

  const { scrollToSection } = useScroll();

  return (
    <header
      className={`nav-section ${show ? "show" : "hide"}`}
    >
      <div className="nav-container">
        <div className="nav-content">
          {/* Portfolio */}
          <button
            className="logo-button"
            onClick={() => scrollToSection("hero")}
          >
            <span className="logo-container">
              <span className="logo-content">
                <span className="main-text">Portfolio</span>
                <span className="name-divide">|</span>
              </span>
              <span className="slide-content">
                <span className="name-text">Titipa</span>
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <div className="nav-items">
              {navItems.map((item) => (
                <button
                  key={item}
                  className="nav-item-button"
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                </button>
              ))}

              <button className="resume-button">Resume</button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <button className="nav-mobile">
            <ion-icon name="menu"></ion-icon>
          </button>
        </div>
      </div>
    </header>
  );
}
