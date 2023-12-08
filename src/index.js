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

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-1",
    start: "25% top",
    end: "bottom bottom",
    scrub: true,
  },
});

// Fade in animation for the newly added p elements
tl.staggerFrom("#section-1 .info", 1, {
  opacity: 0,
  x: -50, // Move from left to right
}, 0.5); // Stagger the fade-in with a delay of 0.5 seconds between each paragraph

// Define the zoom-in animation for the image
tl.to("#section-1 img", {
  scale: 1.5, // Adjust the scale factor for zooming
  transformOrigin: "bottom left", // Zoom to the bottom left corner
});

// Fade in animation for the p elements with stagger
tl.staggerFrom(
  "#section-1 .container p",
  0.5,
  {
    opacity: 0,
    brightness: 100,
    y: 20, // Adjust the distance the elements move
  },
  0.2,
  "-=0.5"
); // Start the fade-in slightly before the zoom-in animation

// Create an overlay div for background darkening effect
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.getElementById("section-1").appendChild(overlay);

// Darken background effect
tl.to(
  overlay,
  {
    start: '25% top',
    end: 'bottom bottom',
    y: -50,
    opacity: 0.3, // Adjust the darkness (0.5 is 50% opacity)
  },
  "-=0.5"
); // Start the background darkening slightly before the zoom-in animation
