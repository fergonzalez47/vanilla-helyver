
// carrusel

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Detectar deslizamiento en dispositivos móviles
let startX;

const slideshowContainer = document.querySelector('.slideshow-container');

// Al tocar la pantalla
slideshowContainer.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
});

// Al soltar el toque
slideshowContainer.addEventListener('touchend', function (e) {
    let endX = e.changedTouches[0].clientX;
    handleSwipe(startX, endX);
});

function handleSwipe(start, end) {
    let diffX = start - end;
    if (Math.abs(diffX) > 50) { // Si el deslizamiento es mayor a 50px
        if (diffX > 0) {
            plusSlides(1);  // Desliza a la derecha (próxima imagen)
        } else {
            plusSlides(-1); // Desliza a la izquierda (imagen anterior)
        }
    }
}





// carrusel original


// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     let dots = document.getElementsByClassName("dot");
//     if (n > slides.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = slides.length }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[slideIndex - 1].style.display = "block";
//     dots[slideIndex - 1].className += " active";
// }