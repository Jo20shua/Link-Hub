// Fade-in effect
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});

// Button press effect
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.95)";
    });

    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });
});

/* MOBILE NAV TOGGLE */

const toggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".site-nav");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navLinks.classList.toggle("active");
});

const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  siteNav.classList.toggle("active");
});