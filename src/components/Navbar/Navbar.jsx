import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { useScroll } from "../../hooks/useScroll";

export default function Navbar({ show }) {
  const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

  const { scrollToSection } = useScroll();

  const [navMobileOpen, setNavMobileOpen] = useState(false);
  const toggleMobileNav = () => setNavMobileOpen(!navMobileOpen);

  const dropdownNavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownNavRef.current &&
        !dropdownNavRef.current.contains(event.target)
      ) {
        setNavMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`nav-section ${show ? "show" : "hide"}`}>
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
          <div className="nav-mobile-dropdown" ref={dropdownNavRef}>
            <button className="nav-mobile-button" onClick={toggleMobileNav}>
              <ion-icon
                name="menu"
                style={{ color: navMobileOpen ? "#2563eb" : "" }}
              ></ion-icon>
            </button>

            {navMobileOpen && (
              <div className="nav-mobile-menu">
                {navItems.map((item) => (
                  <button
                    key={item}
                    className="nav-mobile-list"
                    onClick={() => scrollToSection(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
