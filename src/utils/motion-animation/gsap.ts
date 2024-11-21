import { gsap } from "gsap";

// Fade In Animation
export const fadeInAnimation = (element: HTMLElement | null) => {
  if (element) {
    gsap.from(element, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }
};