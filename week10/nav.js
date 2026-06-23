// nav.js - Real-time cursor pill tracking
// Author: Christian Alvarez
// Date: 06/21/2026
//
// Purpose:
// Drives the sliding pill indicator in the bottom navigation. On page load the
// pill snaps to whichever nav link matches the current URL. While the cursor is
// inside the nav the pill follows it in real time; when the cursor leaves it
// snaps back to the active page link.
//
// Technique choices:
// - mousemove + getBoundingClientRect(): Reading each link's bounding box on
//   every mousemove lets the pill track cursor position without hard-coding pixel
//   offsets. This means the layout can change (different number of items, different
//   padding) and the tracking still works without updating the JS.
// - CSS transition on #nav-slider: The animation is handled entirely in CSS
//   (cubic-bezier spring curve). JavaScript only updates left and width; the
//   browser handles interpolation. This keeps motion logic in the stylesheet where
//   it belongs and makes it easy to tune without touching JS.
// - mouseleave to snap back: Snapping to the current page on mouseleave gives
//   visual feedback about where you are without requiring a click, which matches
//   the expected behavior of a persistent active-state indicator.

let navSlider = document.getElementById("nav-slider");
let nav = document.querySelector(".bottom-nav nav");
let navLinks = document.querySelectorAll(".bottom-nav nav ul li a");

// Determine current page from URL
let currentPage = window.location.pathname.split("/").pop() || "index.html";

// Track which link has the pill behind it (for text color)
let currentPillTarget = null;

function setActiveClass(link) {
    navLinks.forEach(function(l) { l.classList.remove("active"); });
    if (link) link.classList.add("active");
}

// Horizontal gap between the pill edge and the nav bar edge (px)
const PILL_INSET = 5;

// Move pill to a link and update text colors
function movePillTo(link) {
    if (!link || link === currentPillTarget) return;
    currentPillTarget = link;
    let r = link.getBoundingClientRect();
    let navRect = nav.getBoundingClientRect();
    navSlider.style.left = (r.left - navRect.left + PILL_INSET) + "px";
    navSlider.style.width = (r.width - PILL_INSET * 2) + "px";
    setActiveClass(link);
}

// Set initial pill on the current page link
navLinks.forEach(function(link) {
    if (link.getAttribute("href") === currentPage) {
        movePillTo(link);
    }
});

// Follow cursor in real time
nav.addEventListener("mousemove", function(e) {
    navLinks.forEach(function(link) {
        let r = link.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right) {
            movePillTo(link);
        }
    });
});

// Snap back to current page when cursor leaves nav
nav.addEventListener("mouseleave", function() {
    navLinks.forEach(function(link) {
        if (link.getAttribute("href") === currentPage) {
            movePillTo(link);
        }
    });
});
