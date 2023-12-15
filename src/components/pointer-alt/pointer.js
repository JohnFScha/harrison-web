document.addEventListener('mousemove', e=> {

  let bubbles = document.createElement('bubbles');
  let x = e.pageX;
  let y = e.pageY;
  let size = Math.random() * 100;

  bubbles.style.left = x  + "px";
  bubbles.style.top = y + "px";
  bubbles.style.width = "100px";
  bubbles.style.height = "100px";
 /*  bubbles.style.transform = `` */
  
  document.body.appendChild(bubbles);
  setTimeout(function() {
    bubbles.remove();
  }, 900);
});