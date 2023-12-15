/* Imports */
import gsap from "../../../node_modules/gsap/index.js";

let ctn = document.querySelectorAll("section.portfolio li");
let descCtn = document.querySelectorAll(".desc-ctn");
let hr = document.querySelectorAll("hr.ctn-line");

ctn.forEach((element, index) => {
    element.addEventListener('mouseover', (event) => hover(event, index));
    element.addEventListener('mouseout', (event) => out(event, index));
});

function hover(event, index) {
  gsap.to(hr[index], 0.7, {
    margin: '50 0 10 0'
  });
  gsap.to(descCtn[index], 0.5, {
    y: 0,
    opacity: 1
  });
}

function out(event, index) {
  gsap.to(hr[index], 0.7, {
    margin: '10 0'
  });
  gsap.to(descCtn[index], 0.5, {
    y: -100,
    opacity: 0
  });
}