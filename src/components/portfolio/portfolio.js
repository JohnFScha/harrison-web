/* Imports */
import gsap from "../../../node_modules/gsap/index.js";

let ctn = document.querySelectorAll("section.portfolio li");
let descCtn = document.querySelectorAll(".desc-ctn");
let hr = document.querySelectorAll("hr.ctn-line");

ctn.forEach((element, index) => {
  element.addEventListener("mouseover", (event) => hover(event, index));
  element.addEventListener("mouseout", (event) => out(event, index));
});

function hover(event, index) {
  gsap.to(hr[index], 0.7, {
    margin: "50 0 10 0",
  });
  gsap.to(descCtn[index], 0.5, {
    y: 0,
    opacity: 1,
  });
}

function out(event, index) {
  gsap.to(hr[index], 0.7, {
    margin: "10 0",
  });
  gsap.to(descCtn[index], 0.5, {
    y: -100,
    opacity: 0,
  });
}

//modales
const liElements = [];
liElements.push(document.getElementById("eugenie"));
liElements.push(document.getElementById("delsud"));
liElements.push(document.getElementById("flexy"));

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const videoEl = document.getElementById("modalVideo");
const closeModal = document.getElementById("closeModal");

const videos = [
  "../../assets/Videos/casoEugenie.mp4",
  "../../assets/Videos/casoDesarrollos.mp4",
  "../../assets/Videos/casoFlexy.mp4",
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
