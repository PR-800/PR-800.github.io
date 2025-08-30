import { useScroll } from "../../hooks/useScroll";
import "./Navbar.css";

export default function Navbar() {
  const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

  const { scrollToSection } = useScroll();

  return (
    <header className="nav-header">
      <div className="nav-container">
        <div className="nav-content">
          <button
            className="logo-button"
            onClick={() => scrollToSection("hero")}
          >
            Portfolio
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
