/* Imports */
import gsap from "../../../node_modules/gsap/index.js";

let titleCtn = document.querySelectorAll("section.portfolio h2");
let descCtn = document.querySelectorAll(".desc-ctn");
let hr = document.querySelectorAll("hr.ctn-line");
const customCursor = document.createElement('div');
customCursor.className = 'hand-cursor';

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
  gsap.to(hr[index], 0.5, {
    margin: '20 0 10 0'
  });
  gsap.to(descCtn[index], 0.3, {
    y: 0,
    opacity: 1,
    margin: '10 0 50 0'
  });
  gsap.to(titleCtn[index], 0.3, {
    color: 'rgb(203, 219, 67)'
  });
  customCursor.style.display = 'block';
}

function out(event, index) {
  gsap.to(hr[index], 0.5, {
    margin: '-12 0'
  });
  gsap.to(descCtn[index], 0.3, {
    y: -100,
    opacity: 0,
    margin: 0
  });
  gsap.to(titleCtn[index], 0.3, {
    color: 'transparent'
  });
  customCursor.style.display = 'none';
}
