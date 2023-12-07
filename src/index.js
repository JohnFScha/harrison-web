/* Imports */

import Lenis from '../node_modules/@studio-freight/lenis/dist/lenis.mjs'
import gsap from "../node_modules/gsap/index.js";
import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger.js";

/* gsap config */

gsap.registerPlugin(ScrollTrigger);

/* Lenis config */

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/* Gsap instantiation */

let tl = gsap.timeline()

tl.from(".text", {
  y: 50,
  opacity: 0,
  scrollTrigger: {
    trigger: '.text',
    start: '10% center',
    end: 'bottom center',
    scrub: true,
    markers: true,
    pinSpacing: false
  }
})