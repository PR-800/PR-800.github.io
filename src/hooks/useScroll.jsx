import { useCallback } from "react";

export const useScroll = () => {
  const scrollToSection = useCallback((sectionId, offset = 64) => {
    const section = document.getElementById(sectionId.toLowerCase());
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        behavior: "smooth",
        top: offsetPosition,
      });
    }
  }, []);

  return {
    scrollToSection,
  };
};
