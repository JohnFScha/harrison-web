/* Imports */

import gsap from "../../../node_modules/gsap/index.js";

/**/

let ctn = document.querySelectorAll(".child");

ctn.forEach((element, index) => {
    element.addEventListener('mouseover', (event) => hover(event, index));
    element.addEventListener('mouseout', (event) => out(event, index));
});

function hover(event, index) {
    // Calculate the original width dynamically
    let originalWidth = getComputedStyle(event.currentTarget).width;

    gsap.to(event.currentTarget, 0.7, {
        width: '2000px'
    });

    // Use forEach to iterate over siblings
    event.currentTarget.parentNode.childNodes.forEach(sibling => {
        if (sibling !== event.currentTarget && sibling.nodeType === 1) {
            gsap.to(sibling, 0.7, {
                width: '1000px'
            });
        }
    });

    // Check if the hovered element is the second or third
    if (index === 1 || index === 2) {
        gsap.to(ctn[0], 0.7, {
            marginLeft: '-100px',
        });
    }

    if (index === 1) {
        gsap.to(ctn[1], 0.7, {
            width: '3000px'
        });

        gsap.to(ctn[0], 0.7, {
            marginLeft: '-200px',
        });
    }
}

function out(event, index) {
    // Retrieve the dynamically calculated original width
    let originalWidth = getComputedStyle(event.currentTarget).width;

    gsap.to(event.currentTarget, 0.7, {
        width: originalWidth
    });

    // Use forEach to iterate over siblings
    event.currentTarget.parentNode.childNodes.forEach(sibling => {
        if (sibling !== event.currentTarget && sibling.nodeType === 1) {
            gsap.to(sibling, 0.7, {
                width: originalWidth
            });
        }
    });

    // Check if the hovered element is the second or third
    if (index === 1 || index === 2) {
        gsap.to(ctn[0], 0.7, {
            marginLeft: '0',
        });
    }

    if (index === 1) {
        gsap.to(ctn[1], 0.7, {
            width: originalWidth
        });
    }
}
// function out() {
//     ctn.forEach(element => {
//         gsap.to(element, 0.7, {
//             width: 100 / ctn.length + '%',
//             ease: 'out(1)' // Back.easeOut is now 'back.out'
//         });
//     });
// }