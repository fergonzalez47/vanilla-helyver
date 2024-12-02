const config = {
    celocia: { name: "Celocia", lineOptions: ["Pequeña", "Grande"] },
    espejo: { name: "Espejo", lineOptions: false },
    puerta: { name: "Puerta", lineOptions: ["Linea 35"] },
    ventanaNormal: { name: "Ventana", lineOptions: ["Linea 25", "Linea 5000"] },
    ventanaProyectante: { name: "Ventana-Proyectante", lineOptions: ["Linea 42"] }

};
const prices = {
    ventana: {
        'linea-25': {
            mate: 80000,
            titanio: 90000,
            blanco: 90000,
            negro: 90000,
            madera: 120000
        },
        'linea-5000': {
            mate: 50000,
            titanio: 60000,
            blanco: 60000,
            negro: 60000,
            madera: 70000
        }
    },
    puerta: {
        'linea-35': {
            todos: 180000
        }
    },
    proyectante: {
        'linea-42': {
            todos: 90000
        }
    },
    celosia: {
        pequeña: 70000,
        grande: 110000
    },
    espejo: 60000
};
// var x, i, j, l, selElmnt, a, b, c;


const serviceOptions = [
    { value: "0", text: "Elige un producto" },
    { value: "celocia", text: "Celocia" },
    { value: "espejo", text: "Espejo" },
    { value: "puerta", text: "Puerta" },
    { value: "ventana", text: "Ventana" },
    { value: "ventanaProyectante", text: "Ventana Proyectante" }
];


const table = document.getElementById("table");
const tbody = table.tBodies[0]; // Obtener el primer <tbody>
const lastRow = tbody.rows[tbody.rows.length - 1]; // Obtener la última fila <tr>
const lastTd = lastRow.cells[lastRow.cells.length - 1]; // Obtener el último <td> de esa fila
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
    addNewRow();
    // Ejecutar la inicialización del select personalizado RECIEN AGREGADOS después de agregar la fila
    initCustomSelects();
})

function addNewRow() {
    const newRow = tbody.insertRow();
    let tdService = document.createElement("td");
    tdService.setAttribute("data-label", "Servicio");
    const selectService = createSelectService();

    tdService.appendChild(selectService);
    newRow.appendChild(tdService);

    
}


function createSelectService() {

    let div = document.createElement("div");
    div.classList.add("custom-select");
    let select = document.createElement("select");

    serviceOptions.forEach(option => {
        let opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        select.appendChild(opt);
    });

    div.appendChild(select);
    return div;
}






// var x, i, j, l, ll, selElmnt, a, b, c;
// /* Look for any elements with the class "custom-select": */
// x = document.getElementsByClassName("custom-select");
// l = x.length;
// for (i = 0; i < l; i++) {
//     selElmnt = x[i].getElementsByTagName("select")[0];
//     ll = selElmnt.length;
//     /* For each element, create a new DIV that will act as the selected item: */
//     a = document.createElement("DIV");
//     a.setAttribute("class", "select-selected");
//     a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//     x[i].appendChild(a);
//     /* For each element, create a new DIV that will contain the option list: */
//     b = document.createElement("DIV");
//     b.setAttribute("class", "select-items select-hide");
//     for (j = 1; j < ll; j++) {
//         /* For each option in the original select element,
//         create a new DIV that will act as an option item: */
//         c = document.createElement("DIV");
//         c.innerHTML = selElmnt.options[j].innerHTML;
//         c.addEventListener("click", function (e) {
//             /* When an item is clicked, update the original select box,
//             and the selected item: */
//             var y, i, k, s, h, sl, yl;
//             s = this.parentNode.parentNode.getElementsByTagName("select")[0];
//             sl = s.length;
//             h = this.parentNode.previousSibling;
//             for (i = 0; i < sl; i++) {
//                 if (s.options[i].innerHTML == this.innerHTML) {
//                     s.selectedIndex = i;
//                     h.innerHTML = this.innerHTML;
//                     y = this.parentNode.getElementsByClassName("same-as-selected");
//                     yl = y.length;
//                     for (k = 0; k < yl; k++) {
//                         y[k].removeAttribute("class");
//                     }
//                     this.setAttribute("class", "same-as-selected");
//                     break;
//                 }
//             }
//             h.click();
//         });
//         b.appendChild(c);
//     }
//     x[i].appendChild(b);
//     a.addEventListener("click", function (e) {
//         /* When the select box is clicked, close any other select boxes,
//         and open/close the current select box: */
//         e.stopPropagation();
//         closeAllSelect(this);
//         this.nextSibling.classList.toggle("select-hide");
//         this.classList.toggle("select-arrow-active");
//     });
// }

// function closeAllSelect(elmnt) {
//     /* A function that will close all select boxes in the document,
//     except the current select box: */
//     var x, y, i, xl, yl, arrNo = [];
//     x = document.getElementsByClassName("select-items");
//     y = document.getElementsByClassName("select-selected");
//     xl = x.length;
//     yl = y.length;
//     for (i = 0; i < yl; i++) {
//         if (elmnt == y[i]) {
//             arrNo.push(i)
//         } else {
//             y[i].classList.remove("select-arrow-active");
//         }
//     }
//     for (i = 0; i < xl; i++) {
//         if (arrNo.indexOf(i)) {
//             x[i].classList.add("select-hide");
//         }
//     }
// }

// /* If the user clicks anywhere outside the select box,
// then close all select boxes: */
// document.addEventListener("click", closeAllSelect);



// var x, i, j, l, ll, selElmnt, a, b, c;
// /* Look for any elements with the class "custom-select": */
// x = document.getElementsByClassName("custom-select");
// l = x.length;
// for (i = 0; i < l; i++) {
//     selElmnt = x[i].getElementsByTagName("select")[0];
//     ll = selElmnt.length;
//     /* For each element, create a new DIV that will act as the selected item: */
//     a = document.createElement("DIV");
//     a.setAttribute("class", "select-selected");
//     a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//     x[i].appendChild(a);
//     /* For each element, create a new DIV that will contain the option list: */
//     b = document.createElement("DIV");
//     b.setAttribute("class", "select-items select-hide");
//     for (j = 1; j < ll; j++) {
//         /* For each option in the original select element,
//         create a new DIV that will act as an option item: */
//         c = document.createElement("DIV");
//         c.innerHTML = selElmnt.options[j].innerHTML;
//         c.addEventListener("click", function (e) {
//             /* When an item is clicked, update the original select box,
//             and the selected item: */
//             var y, i, k, s, h, sl, yl;
//             s = this.parentNode.parentNode.getElementsByTagName("select")[0];
//             sl = s.length;
//             h = this.parentNode.previousSibling;
//             for (i = 0; i < sl; i++) {
//                 if (s.options[i].innerHTML == this.innerHTML) {
//                     s.selectedIndex = i;
//                     h.innerHTML = this.innerHTML;
//                     y = this.parentNode.getElementsByClassName("same-as-selected");
//                     yl = y.length;
//                     for (k = 0; k < yl; k++) {
//                         y[k].removeAttribute("class");
//                     }
//                     this.setAttribute("class", "same-as-selected");
//                     break;
//                 }
//             }
//             h.click();
//         });
//         b.appendChild(c);
//     }
//     x[i].appendChild(b);
//     a.addEventListener("click", function (e) {
//         /* When the select box is clicked, close any other select boxes,
//         and open/close the current select box: */
//         e.stopPropagation();
//         closeAllSelect(this);
//         this.nextSibling.classList.toggle("select-hide");
//         this.classList.toggle("select-arrow-active");
//     });
// }

// function closeAllSelect(elmnt) {
//     /* A function that will close all select boxes in the document,
//     except the current select box: */
//     var x, y, i, xl, yl, arrNo = [];
//     x = document.getElementsByClassName("select-items");
//     y = document.getElementsByClassName("select-selected");
//     xl = x.length;
//     yl = y.length;
//     for (i = 0; i < yl; i++) {
//         if (elmnt == y[i]) {
//             arrNo.push(i)
//         } else {
//             y[i].classList.remove("select-arrow-active");
//         }
//     }
//     for (i = 0; i < xl; i++) {
//         if (arrNo.indexOf(i)) {
//             x[i].classList.add("select-hide");
//         }
//     }
// }

// /* If the user clicks anywhere outside the select box,
// then close all select boxes: */
// document.addEventListener("click", closeAllSelect);






function initCustomSelects() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select" that haven't been initialized: */
    x = document.querySelectorAll(".custom-select:not([data-initialized='true'])");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;

        /* Mark this custom-select as initialized */
        x[i].setAttribute("data-initialized", "true");

        /* Create the selected item DIV */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);

        /* Create the option list DIV */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
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
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
}

function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i);
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i) === -1) {
            x[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);


function calcPrice(service, linea, color, ancho, alto) {
    let area = (ancho / 100) * (alto / 100); // Conversión a metros cuadrados
    let precioBase;

    if (service === 'espejo') {
        precioBase = precios.espejo;
    } else if (service === 'celosia') {
        precioBase = precios.celosia[linea];
    } else {
        precioBase = precios[service][linea][color] || precios[service][linea].todos;
    }

    return area * precioBase;
}
