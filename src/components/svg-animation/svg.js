import Lenis from "../../../node_modules/@studio-freight/lenis/dist/lenis.mjs";
import gsap from "../../../node_modules/gsap/index.js";
import { ScrollTrigger } from "../../../node_modules/gsap/ScrollTrigger.js";

const logoCtn = document.getElementById("init");
const scrollCtn = document.getElementById("scrollea");
const canvas = document.getElementById("image-sequence");

setTimeout(() => {
  logoCtn.style.display = "none";
  scrollCtn.style.display = "flex";
  scrollCtn.style.animation = "fadeInAnimation 1s";
}, 3000);

/* gsap config */
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

var paths = document.querySelectorAll(".path");

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
  images = config.urls.map((url, i) => {
    let img = new Image();
    img.src = url;
    i || (img.onload = updateImage);
    return img;
  });
  gsap.to(playhead, {
    frame: images.length - 1,
    ease: "none",
    onUpdate: updateImage,
    duration: images.length / (config.fps || 30),
    paused: !!config.paused,
    scrollTrigger: config.scrollTrigger,
  });
}

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#scrollea",
    start: "1% top", // Change this according to your needs
    end: "bottom+=5% bottom",
    scrub: true,
    toggleActions: "replay complete reverse complete",
  },
});

// First video section with 87 frames
let urls1 = new Array(141)
  .fill()
  .map(
    (_, i) =>
      `../../assets/camara-frames/ezgif-frame-${(i + 1)
        .toString()
        .padStart(3, "0")}.jpg`
  );
imageSequence({
  urls: urls1,
  canvas: "#image-sequence",
  scrollTrigger: {
    start: "top top",
    end: "bottom+=500% bottom",
    scrub: true,
    markers: true,
    pin: true,
  },
});

const textAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: "#body",
    id: 'texto',
    start: "bottom+=300% center", // Change this according to your needs
    end: "bottom+=500% center", // Adjust the end position based on your needs
    markers: true,
    scrub: true,
  },
});

tl.fromTo(
  "#scrollea",
  {
    opacity: 1,
    x: 0,
  },
  {
    opacity: 0,
    x: -100,
    onComplete: () => {
      gsap.to(canvas, {
        opacity: 1,
        scrollTrigger: {
          trigger: canvas,
          start: "50% top",
          end: "bottom bottom",
          scrub: true,
        },
        onStart: () => {},
      });
    },
  }
);

textAnimation.fromTo(
  "#texto",
  {
    scale: 0,
    opacity: 0
  },
  {
    scale: 1,
    opacity: 1,
    duration: 2
  }
);
