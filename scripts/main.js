const hamburgerMenu = document.getElementById("menu");
const navigation = document.querySelector('.navigation');


hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("open");
    navigation.classList.toggle("open");
})



// form

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".wf1");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("form-visible");
                    observer.unobserve(entry.target); // Deja de observar después de la primera aparición
                }
            });
        },
        { threshold: 0.1 } // Cambia este valor si quieres que el efecto ocurra antes o después
    );

    observer.observe(form);
});
