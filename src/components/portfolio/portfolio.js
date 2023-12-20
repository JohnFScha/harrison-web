/* Imports */
import Lenis from "../../../node_modules/@studio-freight/lenis/dist/lenis.mjs";
import gsap from "../../../node_modules/gsap/index.js";
import { ScrollTrigger } from "../../../node_modules/gsap/ScrollTrigger.js";

let txtCtn = document.querySelectorAll(".text-ctn-1");
let titleCtn = document.querySelectorAll("section.portfolio li h2");
let descCtn = document.querySelectorAll(".desc-ctn");
let ctnHr = document.querySelectorAll("hr.ctn-line");
let previewVideos = document.querySelectorAll(".preview-video");
let logoPortfolio = document.querySelector(".logo-box");
let videoOverlay = document.querySelector(".vid-overlay");
const customCursor = document.createElement("div");
customCursor.className = "hand-cursor";

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

// let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: txtCtn,
//     start: "top+=10% center",
//     end: "bottom+=200% bottom",
//     scrub: true,
//     markers: true,
//     pin: true,
//     onUpdate: ({ progress, direction, isActive }) => {
//       // Perform actions based on the scrubbed timeline progress
//     },
//   },
// });

gsap.to(".sup-rodaje", {
  scrollTrigger: {
  trigger: ".sup-rodaje",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  },
});

gsap.to(".txt-ctn-1", {
  scrollTrigger: {
    trigger: ".txt-ctn-1",
    start: "top center",
    end: "bottom+=100% bottom",
    scrub: true,
    markers: true,
  },
});

gsap.to(".sup-rodaje", {
  top: 0
});

gsap.to(".txt-row:nth-child(1)", {
  opacity: 1,
  // duration: 5,
});

gsap.to(".txt-row:nth-child(2)", {
  opacity: 1,
});


// // Fade in animation for the newly added p elements
// tl.staggerFrom(".bg-rodaje", 1, {
//   opacity: 0,
//   // x: -50, // Move from left to right
// }, 0.5); // Stagger the fade-in with a delay of 0.5 seconds between each paragraph

// // Define the zoom-in animation for the image
// tl.to(".sup-rodaje", {
//   // scale: 1.5, // Adjust the scale factor for zooming
//   // transformOrigin: "bottom left", // Zoom to the bottom left corner
// });

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
