/* Imports */

import Lenis from "../node_modules/@studio-freight/lenis/dist/lenis.mjs";
import gsap from "../node_modules/gsap/index.js";
import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger.js";

/* gsap config */

gsap.registerPlugin(ScrollTrigger);

/* Lenis config */

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* Gsap instantiation */

let tl = gsap.timeline();

tl.from(".text-1", {
  y: 50,
  opacity: 0,
  scrollTrigger: {
    trigger: ".text-1",
    start: "-200% center",
    end: "-100% center",
    scrub: true,
    pinSpacing: false,
  },
});

tl.from(".text-2", {
  y: 50,
  opacity: 0,
  scrollTrigger: {
    trigger: ".text-2",
    start: "-200% center",
    end: "-100% center",
    scrub: true,
    pinSpacing: false,
  },
});

tl.from(".text-3", {
  y: 50,
  opacity: 0,
  scrollTrigger: {
    trigger: ".text-3",
    start: "-200% center",
    end: "-150% center",
    scrub: true,
    markers: true,
    pinSpacing: false,
  },
});

tl.to("#section-1 img", {
  scale: 1.5, // Adjust the scale factor for zooming
  transformOrigin: "bottom left", // Zoom to the bottom left corner
  scrollTrigger: {
    trigger: "#section-1",
    start: "50% top",
    end: "bottom bottom",
    scrub: true,
    markers: true
  },
});
