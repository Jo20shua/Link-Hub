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

//Mobile menu toggle
const hamburger = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open");
});

// To close the menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});