import Lenis from "../../../node_modules/@studio-freight/lenis/dist/lenis.mjs";
import gsap from "../../../node_modules/gsap/index.js";
import { ScrollTrigger } from "../../../node_modules/gsap/ScrollTrigger.js";

/* gsap config */
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

var paths = document.querySelectorAll("path");

paths.forEach((path) => {
  var length = path.getTotalLength();
  // Clear any previous transition
  path.style.transition = path.style.WebkitTransition = "none";
  // Set up the starting positions
  path.style.strokeDasharray = length + " " + length;
  path.style.strokeDashoffset = length;
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();
  // Define our transition
  path.style.transition = path.style.WebkitTransition =
    "stroke-dashoffset 2s ease-in-out";
  // Go!
  path.style.strokeDashoffset = "0";
});

const mainTimeline = gsap.timeline();

gsap.utils.toArray('-container').forEach((section, index) => {
  gsap.from(section, {
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: section,
      start: 'top center',
      end: 'center center',
      scrub: 1,
    },
  });

  if (index < 2) {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom center',
        pin: true,
        scrub: 1,
      },
    });
  }
  // Add animations to the main timeline
  mainTimeline.add(fadeAnimation, 0); // Add fadeAnimation at the current time of the main timeline
  if (index < 2) {
    mainTimeline.add(pinAnimation, 0); // Add pinAnimation at the current time of the main timeline
  }
});

