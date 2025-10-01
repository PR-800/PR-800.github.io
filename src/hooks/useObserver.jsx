import { useEffect, useState } from "react";

export const useIntersectionObserver = (sectionId) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0,
        rootMargin: "-200px 0px",
      }
    );

    const section = document.querySelector(`#${sectionId.toLowerCase()}`);
    if (section) {
      observer.observe(section);
    }

    return () => {
      section && observer.unobserve(section);
    };
  }, [sectionId]);

  return isVisible;
};
