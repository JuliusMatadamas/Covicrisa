const navbar = document.querySelector(".navbar");
const btnMenuOpen = navbar.querySelectorAll(":scope > span")[0];
const sideBarLogo = document.querySelector(".sidebar-logo");
const btnMenuClose = sideBarLogo.querySelectorAll(":scope > span")[0];
const navLinks = document.querySelector(".nav-links");

btnMenuOpen.addEventListener("click", () => {
    navLinks.style.left = "0";
});

btnMenuClose.addEventListener("click", () => {
    navLinks.style.left = "-100%";
});
