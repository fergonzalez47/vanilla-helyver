const hamburger = document.querySelector(".hamburger");

const navMenu = document.querySelector(".nav-menu");


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active-opt");
    navMenu.classList.toggle("active-opt");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active-opt");
    navMenu.classList.remove("active-opt");
}));


document.querySelector("main").addEventListener("click", () => {
    hamburger.classList.remove("active-opt");
    navMenu.classList.remove("active-opt");
})