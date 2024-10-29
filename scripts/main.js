const hamburgerMenu = document.getElementById("menu");
const navigation = document.querySelector('.navigation');


hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("open");
    navigation.classList.toggle("open");
})

