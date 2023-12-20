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

/* ************* DOM elements ************ */

/* Intro dom */

const logoCtn = document.getElementById("init");
const scrollCtn = document.getElementById("scrollea");
const canvas = document.getElementById("image-sequence-1");

/* end intro dom */

setTimeout(() => {
  logoCtn.style.display = "none";
  scrollCtn.style.display = "flex";
  scrollCtn.style.animation = "fadeInAnimation 1s";
}, 3000);

/* ******* Init svg animation ******* */

var paths = document.querySelectorAll(".path");

paths.forEach((path) => {
  var length = path.getTotalLength();
  path.style.transition = path.style.WebkitTransition = "none";
  path.style.strokeDasharray = length + " " + length;
  path.style.strokeDashoffset = length;
  path.getBoundingClientRect();
  path.style.transition = path.style.WebkitTransition =
    "stroke-dashoffset 2s ease-in-out";
  path.style.strokeDashoffset = "0";
});

/* ********** Frame animation function ********** */

function imageSequence(config) {
  let playhead = { frame: 0 },
    canvas =
      gsap.utils.toArray(config.canvas)[0] ||
      console.warn("canvas not defined"),
    ctx = canvas.getContext("2d"),
    curFrame = -1,
    onUpdate = config.onUpdate,
    images,
    updateImage = function () {
      let frame = Math.round(playhead.frame);
      if (frame !== curFrame) {
        config.clear && ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
        curFrame = frame;
        onUpdate && onUpdate.call(this, frame, images[frame]);
      }
    };
  images = config.urls.map((url) => {
    let img = new Image();
    img.src = url;
    img.onload = updateImage;
    return img;
  });
  return gsap.to(playhead, {
    frame: images.length - 1,
    ease: "none",
    onUpdate: updateImage,
    duration: images.length / (config.fps || 30),
    paused: !!config.paused,
    scrollTrigger: config.scrollTrigger,
  });
}

/* ******** Video frames ******** */

let urls1 = new Array(141)
  .fill()
  .map(
    (_, i) =>
      `../src/assets/camara-frames/ezgif-frame-${(i + 1)
        .toString()
        .padStart(3, "0")}.jpg`
  );

/* ********* Timelines ********* */

const introTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#intro",
    start: "top top",
    end: "top+=5% top+=5%",
    scrub: true,
    toggleActions: "play complete reverse complete",
  },
});

const introTextTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#intro",
    start: "center+=15% center",
    end: "bottom bottom",
    scrub: true,
    toggleActions: "play complete reverse restart",
  },
});

/* *********** INTRO SCROLLING ********** */

introTimeline.fromTo(
  "#scrollea",
  {
    opacity: 1,
    x: 0,
  },
  {
    opacity: 0,
    x: -100,
    onComplete: () => {
      imageSequence({
        urls: urls1,
        canvas: canvas,
        scrollTrigger: {
          scrub: true,
        },
      });
    },
  }
);

introTextTimeline.fromTo(
  "#texto",
  {
    scale: 0,
    opacity: 0,
    duration: 10,
  },
  {
    scale: 1,
    opacity: 1,
    duration: 10,
  }
);

introTextTimeline.to(".fill", {
  color: "#D1D821",
  stagger: 5,
  duration: 5,
});

introTextTimeline.to("#texto", {
  y: -500,
  duration: 10,
});

introTextTimeline.to('#intro', {
  opacity: 0
})