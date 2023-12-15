import gsap from "../../../node_modules/gsap/index.js";
import { ScrollTrigger } from "../../../node_modules/gsap/ScrollTrigger.js";
import Lenis from "../../../node_modules/@studio-freight/lenis/dist/lenis.mjs";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

let textTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#text-container",
    start: "top top",
    end: "bottom+=360%",
    scrub: true,
    markers: true,
    pin: true,
  },
});
textTl.to("#p1", { x: 0 }).to("#p2", { x: 0 });
textTl.to("#p1", { x: -2000 });
textTl.to("#p2", { y: 56 });
textTl.to("#carousel", { fontSize: "3rem" });
