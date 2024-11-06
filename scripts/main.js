const hamburgerMenu = document.getElementById("menu");
const navigation = document.querySelector('.navigation');


hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("open");
    navigation.classList.toggle("open");
})



//IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
    const objectsToTransition = document.querySelectorAll(".IOO");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");



                    // Seleccionar y animar los elementos hijos con la clase "hidden-content"
                    const hiddenContents = entry.target.querySelectorAll(".hidden-content");
                    hiddenContents.forEach(content => {
                        content.classList.add("visible-content");

                        content.addEventListener("transitionend", () => {
                            content.classList.remove("hidden-content");
                        }, { once: true });
                    });

                    entry.target.addEventListener("transitionend", () => {
                        entry.target.classList.remove("hidden");
                    }, { once: true })
                    observer.unobserve(entry.target); // Deja de observar después de la primera aparición
                }
            });
        },
        { threshold: 0.1 } // este valor representa el procentaje del elemento mostrandose en pantalla en %. efecto ocurra antes o después
    );

    objectsToTransition.forEach(obj => observer.observe(obj));
});
