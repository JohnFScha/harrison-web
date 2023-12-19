import Lenis from "../../../node_modules/@studio-freight/lenis/dist/lenis.mjs";
import gsap from "../../../node_modules/gsap/index.js";
import { ScrollTrigger } from "../../../node_modules/gsap/ScrollTrigger.js";

const svgFlip = document.getElementById("init");
const textFlip = document.getElementById("p1_postC");
const chars = textFlip.innerHTML.substring(17, 32).split("");

/* gsap config */
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

setTimeout(() => {
  svgFlip.style.visibility = "hidden";
  textFlip.style.visibility = "visible";
  textFlip.style.animation = "text-flip-animate 0.5s";
}, 2896);

const textFill = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "center center",
    scrub: true,
    markers: true,
    toggleActions: "play complete reverse restart",
  },
});

textFill.staggerTo(
  chars,
  1,
  {
    color: "#D1D821",
    duration: 5,
  },
  0.5
);
