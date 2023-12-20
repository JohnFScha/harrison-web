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

/* ****************** Intro dom ****************** */

const logoCtn = document.getElementById("init");
const scrollCtn = document.getElementById("scrollea");
const canvas = document.getElementById("image-sequence-1");

/* ****************** end intro dom ****************** */

/* ****************** Portfolio dom ****************** */

let txtCtn = document.querySelectorAll(".text-ctn-1");
let titleCtn = document.querySelectorAll("section.portfolio li h2");
let descCtn = document.querySelectorAll(".desc-ctn");
let ctnHr = document.querySelectorAll("hr.ctn-line");
let previewVideos = document.querySelectorAll(".preview-video");
let logoPortfolio = document.querySelector(".logo-box");
let videoOverlay = document.querySelector(".vid-overlay");
const customCursor = document.createElement("div");
customCursor.className = "hand-cursor";

// modals
const liElements = [];
liElements.push(document.getElementById("eugenie"));
liElements.push(document.getElementById("delsud"));
liElements.push(document.getElementById("flexy"));

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const videoEl = document.getElementById("modalVideo");
const closeModal = document.getElementById("closeModal");

const videos = [
  "../../assets/casos/eugenie-comp.mp4",
  "../../assets/casos/delsud-comp.mp4",
  "../../assets/casos/flexy-comp.mp4",
];
let currentVideo = null;

/* ******************  dom manipulation ****************** */


// Append customCursor to the body
document.body.appendChild(customCursor);

titleCtn.forEach((element, index) => {

  element.addEventListener('mouseover', (event) => hover(event, index));
  element.addEventListener('mouseout', (event) => out(event, index));
  element.addEventListener('mousemove', (event) => {
    // Update the position of the custom cursor based on the mouse pointer
    customCursor.style.left = event.pageX + 'px';
    customCursor.style.top = event.pageY + 'px';
  });
});

function hover(event, index) {
  gsap.to(ctnHr[index], 0.5, {
    margin: '20 0 10 0'
  });
  gsap.to(descCtn[index], 0.3, {
    y: 0,
    opacity: 1,
    // margin: '10 0 50 0'
  });
  gsap.to(titleCtn[index], 0.3, {
    color: 'rgb(203, 219, 67)',
    height: 100
  });
  gsap.to(titleCtn[1], 0.7, {
    height: 190
  });
  gsap.to(previewVideos[index], 0.4, {
    opacity: 1
  });
  gsap.to(videoOverlay, 0.4, {
    opacity: 0.4
  });
  gsap.to(logoPortfolio, 0.4, {
    opacity: 0
  });
  customCursor.style.display = 'block';
}

function out(event, index) {
  gsap.to(ctnHr[index], 0.5, {
    margin: '-12 0'
  });
  gsap.to(descCtn[index], 0.3, {
    y: -100,
    opacity: 0,
    // margin: 0
  });
  gsap.to(titleCtn[index], 0.3, {
    color: 'transparent',
    height: 'auto'
  });
  gsap.to(previewVideos[index], 0.4, {
    opacity: 0
  });
  gsap.to(videoOverlay, 0.4, {
    opacity: 1
  });
  gsap.to(logoPortfolio, 0.4, {
    opacity: 0.4
  });
  customCursor.style.display = 'none';
}

liElements.forEach((liElement, index) =>
  liElement.addEventListener("click", () => {
    if (currentVideo && currentVideo.parentNode) {
      currentVideo.parentNode.removeChild(currentVideo);
    }
    let newVideo = document.createElement("video");
    newVideo.id = "modalVideo";
    let swapSrc = document.createElement("source");
    swapSrc.src = videos[index];
    newVideo.appendChild(swapSrc);
    modalContent.appendChild(newVideo);
    modal.classList.add("shown");
    newVideo.play();
    currentVideo = newVideo;
  })
);

closeModal.addEventListener("click", () => {
  if (currentVideo) {
    currentVideo.pause();
    currentVideo.parentNode.removeChild(currentVideo);
    currentVideo = null;
  }
  modal.classList.remove("shown");
});

/* ****************** end dom manipulation ****************** */

/* ****************** end Portfolio dom ****************** */

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

let portfolioTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.portfolio',
    start: "top-=2800% top",
    end: "bottom+=2800% bottom",
    scrub: true,
    markers: true,
    pin: true,
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

/* *********** END INTRO SCROLLING ********** */


/* *********** PORTFOLIO SCROLLING ********** */

portfolioTl.to(".bg-rodaje", {
  yPercent: -66,
  duration: 15,
  opacity: 0.8,
  scrollTrigger: ".sup-rodaje"
});

portfolioTl.to(".sup-rodaje", {
  delay: 3,
  duration: 12,
  yPercent: -66,
});

portfolioTl.to(".txt-ctn-1 .txt-row h2", {
  opacity: 1,
  duration: 5,
});

portfolioTl.to(".txt-ctn-1 .dup-ctn span", {
  opacity: 1,
  stagger: 1,
  duration: 3,
  scrollTrigger: '.dup-ctn span'
});

portfolioTl.to(".txt-ctn-1 .dup-ctn span", {
  color: "#D1D821",
  stagger: 1,
  duration: 3,
  delay: 5,
});

portfolioTl.to(".sup-rodaje.zoomed", {
  duration: 3,
  opacity: 1,
  delay: 10,
});


portfolioTl.to(".txt-ctn-1", {
  duration: 5,
  opacity: 0,
});

portfolioTl.to(".sup-rodaje", {
  duration: 10,
  scale: 2.5,
  transformOrigin: "32% bottom",
  scrollTrigger: ".txt-ctn-2 .txt-row h2, .bg-overlay",
});

portfolioTl.to(".bg-overlay", {
  duration: 5,
  opacity: 0.3,
});

portfolioTl.to(".txt-ctn-2 .txt-row h2", {
  opacity: 1,
  duration: 4,
});

portfolioTl.to(".txt-ctn-2 .dup-ctn span", {
  opacity: 1,
  stagger: 1,
  duration: 2,
  scrollTrigger: '.dup-ctn span'
});

portfolioTl.to(".txt-ctn-2 .dup-ctn span", {
  color: "#D1D821",
  stagger: 1,
  duration: 2,
  delay: 4,
});

portfolioTl.to(".txt-ctn-2", {
  opacity: 0,
  duration: 4,
  delay: 4,
});

portfolioTl.to(".pf-accordion-outer", {
  opacity: 1,
  duration: 1,
  scrollTrigger: '.bg-overlay',
  zIndex: 20,
});

portfolioTl.to(".bg-overlay", {
  duration: 3,
  opacity: 0.5,
  scrollTrigger: '.pf-accordion-outer ol li h2',
});

portfolioTl.to(".pf-accordion-outer ol li h2", {
  y: 0,
  opacity: 1,
  stagger: 1,
  duration: 2,
  delay: 1,
});

portfolioTl.to(".pf-accordion", {
  delay: 3,
  opacity: 0,
  duration: 4,
  scrollTrigger: ".pf-accordion",
});

portfolioTl.to(".pf-accordion-outer ol li h2", {
  y: 30,
  opacity: 0,
  stagger: 1,
  delay: 2,
  duration: 4,
});

portfolioTl.to(".sup-rodaje", {
  delay: -4,
  duration: 5,
  width: '450%',
  left: '-290%',
  top: '-200%',
  scrollTrigger: '.box-ctn',
});

portfolioTl.to(".box-ctn", {
  delay: -4,
  duration: 3.5,
  scale: 4.2,
  xPercent: -100,
});

portfolioTl.to(".portfolio", {
  opacity: 0,
  duration: 3,
});

/* *********** END PORTFOLIO SCROLLING ********** */
