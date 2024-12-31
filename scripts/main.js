// const hamburgerMenu = document.getElementById("menu");
// const navigation = document.querySelector('.navigation');


// hamburgerMenu.addEventListener("click", () => {
//     hamburgerMenu.classList.toggle("open");
//     navigation.classList.toggle("open");
// })





// tooltip


function toggleTooltip(event) {
    const tooltip = event.currentTarget;
    tooltip.classList.toggle('active');
}





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
        { threshold: 0.3 } // este valor representa el procentaje del elemento mostrandose en pantalla en %. efecto ocurra antes o después
    );

    objectsToTransition.forEach(obj => observer.observe(obj));
});




var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);