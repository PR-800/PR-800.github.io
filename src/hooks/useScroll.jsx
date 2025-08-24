import { useCallback } from "react";

export const useScroll = () => {
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId.toLowerCase());
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return {
    scrollToSection,
  };
};
