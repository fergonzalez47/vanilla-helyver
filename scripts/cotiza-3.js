const config = {
    celocia: { name: "Celocia", lineOptions: ["Pequeña", "Grande"] },
    espejo: { name: "Espejo", lineOptions: false },
    puerta: { name: "Puerta", lineOptions: ["Linea 35"] },
    ventanaNormal: { name: "Ventana", lineOptions: ["Linea 25", "Linea 5000"] },
    ventanaProyectante: { name: "Ventana-Proyectante", lineOptions: ["Linea 42"] }

};
const precios = {
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


const serviceOptions = [
    { value: "0", text: "Elige un producto" },
    { value: "celocia", text: "Celocia" },
    { value: "espejo", text: "Espejo" },
    { value: "puerta", text: "Puerta" },
    { value: "ventana", text: "Ventana" },
    { value: "ventanaProyectante", text: "Ventana Proyectante" }
];

document.addEventListener("DOMContentLoaded", () => {
    checkAndAddRow();
});


function checkAndAddRow() {
    if (tbody.rows.length === 0) {
        addNewRow();
        initCustomSelects(); // Inicializa el select después de agregar la fila
    }
}

const table = document.getElementById("table");
const tbody = table.tBodies[0]; // Obtener el primer <tbody>
// const lastRow = tbody.rows[tbody.rows.length - 1]; // Obtener la última fila <tr>
// const lastTd = lastRow.cells[lastRow.cells.length - 1]; // Obtener el último <td> de esa fila
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
    addNewRow();
    // Ejecutar la inicialización del select personalizado RECIEN AGREGADOS después de agregar la fila
    initCustomSelects();
})






function addNewRow() {
    const newRow = tbody.insertRow();


    let tdService = document.createElement("td");
    let tdColor = document.createElement("td");
    let tdWidth = document.createElement("td");
    let tdHeight = document.createElement("td");
    let tdLine = document.createElement("td");
    let tdSubtotal = document.createElement("td");
    let tdDeleteContainer = document.createElement("td");

    tdService.setAttribute("data-label", "Servicio");
    tdColor.setAttribute("data-label", "Color");
    tdWidth.setAttribute("data-label", "Ancho(cm)");
    tdHeight.setAttribute("data-label", "Alto(cm)");
    tdLine.setAttribute("data-label", "Linea Aluminio");
    tdSubtotal.setAttribute("data-label", "Subtotal");

    const deleteButton = createDeleteButton(newRow);

    let row = {
        color: tdColor,
        width: tdWidth,
        height: tdHeight,
        lineAM: tdLine,
        subtotal: tdSubtotal,
        DeleteContainer: tdDeleteContainer
    }

    const selectService = createSelectService();
    selectService.addEventListener("click", (e) => {

        /*aqui lo que hago es verificar que el div seleccionado primero:
        Tenga un data-value establecido
        El data-value es un atributo que agregué a fin de poder identificar de manera unica
        cada div, como un valor y no tener que acceder al innerHTML que es menos seguro */

        // e.target.classList.contains("same-as-selected") verifica que ademas, el div seleccionado efecticamente
        // sea el seleccionado , valga la redudancia

        if (e.target.dataset.value && e.target.classList.contains("same-as-selected")) {
            handleServiceSelectChange(e.target.dataset.value, tdService.parentElement, deleteButton, row);
        }
    });


    tdService.appendChild(selectService);
    newRow.appendChild(tdService);
    newRow.appendChild(tdColor);
    newRow.appendChild(tdWidth);
    newRow.appendChild(tdHeight);
    newRow.appendChild(tdLine);
    newRow.appendChild(tdSubtotal);
    newRow.appendChild(tdDeleteContainer);

}

function handleServiceSelectChange(element, parentContainer, deleteBtn, row) {
    chooseOptionToDisplay(element, parentContainer, deleteBtn, row);

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


function chooseOptionToDisplay(param, parent, deleteBtn, row) {

    /*param: valor seleccionado por el user como ejemplo venta,a puerta, etc
     parent: contenedor donde desplegaremos o limpiaremos
      deleteBtn: Boton que ira en el ultimo td para eliminar el tr en caso de que se quiera
        row: objeto que contiene los td en orden
         */
    clearRow(row);

    row.DeleteContainer.appendChild(deleteBtn);

    let item;
    switch (param) {
        case "celocia":
            item = createCelocia();

            row.color.innerHTML = item.color;
            row.height.innerHTML = `<p class="text-alt">No aplica</p>`;
            row.width.innerHTML = `<p class="text-alt">No aplica</p>`;
            row.lineAM.innerHTML = item.size;
            row.subtotal.innerHTML = item.name;

            break;
        case "espejo":
            item = createMirror();
            row.color.innerHTML = `<p class="text-alt">No aplica</p>`;
            row.width.innerHTML = item.width;
            row.height.innerHTML = item.height;
            row.lineAM.innerHTML = `<p class="text-alt">No aplica</p>`;
            row.subtotal.innerHTML = item.name;

            break;
        case "puerta":
            item = createDoor();
            row.color.innerHTML = item.colors;
            row.width.innerHTML = item.width;
            row.height.innerHTML = item.height;
            row.lineAM.innerHTML = item.lineAM;
            row.subtotal.innerHTML = item.name;

            break;
        case "ventana":
            item = createWindow();
            row.color.innerHTML = item.colors;
            row.width.innerHTML = item.width;
            row.height.innerHTML = item.height;
            row.lineAM.innerHTML = item.lineAM;
            row.subtotal.innerHTML = item.name;
            break;
        case "ventanaProyectante":
            item = createProjectingWindow();
            row.color.innerHTML = item.colors;
            row.width.innerHTML = item.width;
            row.height.innerHTML = item.height;
            row.lineAM.innerHTML = item.lineAM;
            row.subtotal.innerHTML = item.name;
            break;
        default:
            row.innerHTML = "<p>Opción no válida, selecciona una opción correcta.</p>";
            break;
    }
    initCustomSelects();
    row.subtotal.innerHTML = `<p>$ <span class="subtotal-value">0</span></p>`;
    setupPriceCalculation(row, param);
}




// DELETE BUTTON

function createDeleteButton(row) {
    const div = document.createElement("div");
    div.classList.add("container-delete-btn");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("aria-label", "Eliminar esta cotización");

    const img = document.createElement("img");
    img.setAttribute("src", "../images/svg/delete-svg.svg");
    img.setAttribute("alt", "Boton de eliminar");
    deleteBtn.appendChild(img);

    deleteBtn.addEventListener("click", () => {
        row.remove();
        // deleteService(row);
    })
    div.appendChild(deleteBtn);
    return div;

}

function deleteService(row) {
    tbody.removeChild(row);
}


// CREATE SERVICES

function createCelocia() {
    let celocia = config.celocia;

    let celociaObj = {};
    /*el problema esta en data-initialized='true'
    la funciuon que lo activ ya lo toma asi */
    let celociaColors = `
                        <div class="custom-select" >
                            <select>
                                <option value="0">Elige el color</option>
                                <option value="blanco">Blanco</option>
                                <option value="madera">Madera</option>
                                <option value="mate">Mate</option>
                                <option value="negro">Negro</option>
                                <option value="titanio">Titanio</option>
                            </select>
                        </div>
                        `;
    let celociaSize = `
                        <div class="custom-select">
                            <select>
                                <option value="0">Elige el tamaño</option>
                                <option value="grande">Grande</option>
                                <option value="pequeña">Pequeña</option>
                            </select>
                        </div>
                        `;


    celociaObj.name = celocia.name;
    celociaObj.color = celociaColors;
    celociaObj.size = celociaSize;
    return celociaObj;
}

function createWindow() {
    let window = config.ventanaNormal;

    let windowObj = {};
    windowColors = `
                        <div class="custom-select" >
                            <select>
                                <option value="0">Elige el color</option>
                                <option value="blanco">Blanco</option>
                                <option value="madera">Madera</option>
                                <option value="mate">Mate</option>
                                <option value="negro">Negro</option>
                                <option value="titanio">Titanio</option>
                            </select>
                        </div>
                        `;
    let windowLineAm = `
                        <div class="custom-select" >
                            <select>
                                <option value="0">Elige el Aluminio</option>
                                <option value="line25">Linea 25</option>
                                <option value="line5000">Linea 5000</option>
                            </select>
                        </div>
                        `;


    let windowWidth = `
                        <label>
                            <input placeholder="Ejemplo: 30 (cm)" type="number" min="0" name="height" required
                                class="${window.name}-width">
                        </label>
                        `;
    let windowHeight = `
                        <label>
                            <input placeholder="Ejemplo: 90 (cm)" type="number" min="0" name="height" required
                                class="${window.name}-height">
                        </label>
                        `;


    windowObj.name = window.name;
    windowObj.colors = windowColors;
    windowObj.width = windowWidth;
    windowObj.height = windowHeight;
    windowObj.lineAM = windowLineAm;



    return windowObj;
}

function createProjectingWindow() {
    let projectingWindow = config.ventanaNormal;

    let projectingWindowObj = {};
    projectingWindowColors = `
                        <div class="custom-select" >
                            <select>
                                <option value="0">Elige el color</option>
                                <option value="blanco">Blanco</option>
                                <option value="madera">Madera</option>
                                <option value="mate">Mate</option>
                                <option value="negro">Negro</option>
                                <option value="titanio">Titanio</option>
                            </select>
                        </div>
                        `;
    let projectingWindowLineAm = `
                        <p>
                           Linea 42
                        </p>
                        `;


    let projectingWindowWidth = `
                        <label>
                            <input placeholder="Ejemplo: 30 (cm)" type="number" min="0" name="height" required
                                class="${projectingWindow.name}-width">
                        </label>
                        `;
    let projectingWindowHeight = `
                        <label>
                            <input placeholder="Ejemplo: 90 (cm)" type="number" min="0" name="height" required
                                class="${projectingWindow.name}-height">
                        </label>
                        `;


    projectingWindowObj.name = projectingWindow.name;
    projectingWindowObj.colors = projectingWindowColors;
    projectingWindowObj.width = projectingWindowWidth;
    projectingWindowObj.height = projectingWindowHeight;
    projectingWindowObj.lineAM = projectingWindowLineAm;



    return projectingWindowObj;
}

function createDoor() {
    let door = config.puerta;

    let doorObj = {};
    doorColors = `
                        <div class="custom-select" >
                            <select>
                                <option value="0">Elige el color</option>
                                <option value="blanco">Blanco</option>
                                <option value="madera">Madera</option>
                                <option value="mate">Mate</option>
                                <option value="negro">Negro</option>
                                <option value="titanio">Titanio</option>
                            </select>
                        </div>
                        `;
    let doorLineAm = `
                        <p>
                        Linea 35
                        </p>
                        `;


    let doorWidth = `
                        <label>
                            <input placeholder="Ejemplo: 30 (cm)" type="number" min="0" name="height" required
                                class="${door.name}-width">
                        </label>
                        `;
    let doorHeight = `
                        <label>
                            <input placeholder="Ejemplo: 90 (cm)" type="number" min="0" name="height" required
                                class="${door.name}-height">
                        </label>
                        `;


    doorObj.name = door.name;
    doorObj.colors = doorColors;
    doorObj.width = doorWidth;
    doorObj.height = doorHeight;
    doorObj.lineAM = doorLineAm;



    return doorObj;
}

function createMirror() {
    let mirror = config.espejo;

    let mirrorObj = {};
    /*el problema esta en data-initialized='true'
    la funciuon que lo activ ya lo toma asi */
    let mirrorWidth = `
                        <label>
                            <input placeholder="Ejemplo: 30 (cm)" type="number" min="0" name="height" required
                                class="${mirror.name}-width">
                        </label>
                        `;
    let mirrorHeight = `
                        <label>
                            <input placeholder="Ejemplo: 90 (cm)" type="number" min="0" name="height" required
                                class="${mirror.name}-height">
                        </label>
                        `;


    mirrorObj.name = mirror.name;
    mirrorObj.width = mirrorWidth;
    mirrorObj.height = mirrorHeight;


    return mirrorObj;
}


function clearRow(row) {
    Object.values(row).forEach(cell => cell.innerHTML = "");
}


function initCustomSelects() {
    // console.log("si se llama");
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
            c.setAttribute("data-value", selElmnt.options[j].value); // Agregar el valor como atributo de datos

            c.addEventListener("click", function (e) {
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;


                        // Captura del valor seleccionado
                        // const selectedValue = s.options[i].value; // Opción seleccionada
                        // console.log("Valor seleccionado:", selectedValue);

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







function setupPriceCalculation(row, service) {

    try {
        const colorSelect = row.color.querySelector(".select-selected"); // Captura del DIV personalizado
        const widthInput = row.width.querySelector("input");
        const heightInput = row.height.querySelector("input");
        const lineAMSelect = row.lineAM.querySelector("select");
        const subtotalDisplay = row.subtotal.querySelector(".subtotal-value");

        // let width, height, color, lineAM;
        // if (colorSelect) {
        //     colorSelect?.removeEventListener("change", updateSubtotal);
        //     colorSelect?.addEventListener("change", updateSubtotal);
        //     width = 1;

        // } else {

        // }

        function updateSubtotal() {

            const width = parseFloat(widthInput?.value) || 0;
            const height = parseFloat(heightInput?.value) || 0;
            const color = row.color.querySelector("select")?.value || "todos";
            const lineAM = lineAMSelect?.value || "todos";

            const price = calcPrice(service, lineAM, color, width, height);
            subtotalDisplay.textContent = price.toFixed(2);
        }

        // Elimina eventos previos para evitar duplicados
        widthInput?.removeEventListener("input", updateSubtotal);
        heightInput?.removeEventListener("input", updateSubtotal);
        colorSelect?.removeEventListener("click", updateSubtotal);
        lineAMSelect?.removeEventListener("click", updateSubtotal);

        // Agrega eventos nuevos
        widthInput?.addEventListener("input", updateSubtotal);
        heightInput?.addEventListener("input", updateSubtotal);
        colorSelect?.addEventListener("click", updateSubtotal);

        lineAMSelect?.addEventListener("click", updateSubtotal);
    } catch (error) {
        console.log("MANEJO DE ERRORES:", error)
    }
}



function calcPrice(service, linea, color, ancho, alto) {
    let area = (ancho / 100) * (alto / 100); // Conversión a metros cuadrados
    let precioBase;
    console.log("-----------------------------------------------------------------------------------------");
    console.log("service", service);
    console.log("linea", linea);
    console.log("color", color);
    console.log("ancho", ancho);
    console.log("alto", alto);

    if (service === 'espejo') {
        precioBase = precios.espejo;
    } else if (service === 'celosia') {
        precioBase = precios.celosia[linea];
    }
    // } else {
    //     precioBase = precios[service][linea][color] || precios[service][linea].todos;
    // }

    return area * precioBase;
}

