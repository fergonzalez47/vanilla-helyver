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

    const deleteButton = createDeleteButton(tdService.parentElement);

    let row = {
        color: tdColor,
        width: tdWidth,
        height: tdHeight,
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

    // const deleteButton = createDeleteButton(container);

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

    row.color.innerHTML = "";
    row.width.innerHTML = "";
    row.height.innerHTML = "";
    row.subtotal.innerHTML = ""; 


    switch (param) {
        case "celocia":
            let celocia = createCelocia();
            row.color.innerHTML = celocia.color;
            row.width.innerHTML = celocia.size;
            row.height.innerHTML = "No aplica";
            row.subtotal.innerHTML = celocia.name;
            
            break;
        case "espejo":
            div.appendChild(createMirror());
            break;
        case "puerta":
            div.appendChild(createDoor());
            break;
        case "ventanaNormal":
            div.appendChild(createWindow());
            break;
        case "ventanaProyectante":
            div.appendChild(createProjectingWindow());
            break;
        default:
            div.innerHTML = "<p>Opción no válida, selecciona una opción correcta.</p>";
            break;
    }
    initCustomSelects();
}




function chooseOptionToDisplayOriginal(param, parent, deleteBtn, row) {




    // let rowElements = document.createElement("td")
    // let div = parent.querySelector(".show-service");
    // if (!div) {
    //     div = document.createElement("div");
    //     div.classList.add("show-service");
    //     parent.insertRow(div);
    // } else {
    //     div.innerHTML = "";
    // }


    switch (param) {
        case "celocia":
            let fieldsetCelocia = createCelocia();
            div.appendChild(fieldsetCelocia);
            break;
        case "espejo":
            div.appendChild(createMirror());
            break;
        case "puerta":
            div.appendChild(createDoor());
            break;
        case "ventanaNormal":
            div.appendChild(createWindow());
            break;
        case "ventanaProyectante":
            div.appendChild(createProjectingWindow());
            break;
        default:
            div.innerHTML = "<p>Opción no válida, selecciona una opción correcta.</p>";
            break;
    }
}




// DELETE BUTTON

function createDeleteButton(container) {
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
        deleteService(container)
    })
    div.appendChild(deleteBtn);
    return div;

}

function deleteService(container) {
    displayOption.removeChild(container);
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
                        <div class="custom-select" data-initialized='true'>
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
    let selectedService = config.ventanaNormal;

    let fieldset = document.createElement("fieldset");
    fieldset.classList.add(`cotizacion-${selectedService.name}`);



    let innerElements = `
            <legend>Cotización de ${selectedService.name}</legend>`;

    innerElements += `
            <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto "cm".</i></div>
            <div class="div-label-input">
            <label>
                <p><span class="required-element">*</span>Ancho (cm):</p>
                <input placeholder="Ejemplo: 125 (cm)" type="number" name="width" required class="${selectedService.name}-width">
            </label>
            <label>
                <p><span class="required-element">*</span>Alto (cm): </p> 
                <input placeholder="Ejemplo: 90 (cm)" type="number" name="height" required class="${selectedService.name}-height">
            </label>
            </div>
        `;

    // opciones de línea de aluminio solo si aplica
    if (selectedService.lineOptions) {
        innerElements += `
            <fieldset>
                <legend><span class="required-element">*</span>Línea Aluminio:</legend>
                ${selectedService.lineOptions.map(line => `
                    <label>
                        <input type="radio" name="line" required value="${line}"> ${line}
                    </label>
                `).join('')}
            </fieldset>
        `;

        innerElements += `
        <fieldset class="fieldset-block-color">
            <legend><span class="required-element">*</span>Escoge el color del perfil:</legend>
            <label class="color"><input type="radio" name="color" value="blanco">Blanco <div class="color-option" id="color-blanco"></div></label>
            <label class="color"><input type="radio" name="color" value="madera"> Madera <div class="color-option" id="color-madera"></div></label>
            <label class="color"><input type="radio" name="color" value="mate"> Mate <div class="color-option" id="color-mate"></div></label>
            <label class="color"><input type="radio" name="color" value="Negro"> Negro <div class="color-option" id="color-negro"></div></label>
            <label class="color"><input type="radio" name="color" value="titanio"> Titanio <div class="color-option" id="color-titanio"></div></label>
        </fieldset>
    `;
    }


    fieldset.innerHTML = innerElements;

    return fieldset;
}

function createProjectingWindow() {
    let selectedService = config.ventanaProyectante;

    let fieldset = document.createElement("fieldset");
    fieldset.classList.add(`cotizacion-${selectedService.name}`);



    let innerElements = `
            <legend>Cotización de ${selectedService.name}</legend>`;

    innerElements += `
            <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto "cm".</i></div>
             <div class="div-label-input">
            <label>
                <p><span class="required-element">*</span>Ancho (cm):</p>
                <input placeholder="Ejemplo: 125 (cm)" type="number" name="width" required class="${selectedService.name}-width">
            </label>
            <label>
                <p><span class="required-element">*</span>Alto (cm): </p> 
                <input placeholder="Ejemplo: 90 (cm)" type="number" name="height" required class="${selectedService.name}-height">
            </label>
            </div>
        `;

    // opciones de línea de aluminio solo si aplica
    if (selectedService.lineOptions) {
        innerElements += `
            <fieldset>
                <legend><span class="required-element">*</span>Línea Aluminio:</legend>
                ${selectedService.lineOptions.map(line => `
                    <label>
                        <input type="radio" name="line" required value="${line}"> ${line}
                    </label>
                `).join('')}
            </fieldset>
        `;

        innerElements += `
        <fieldset>
            <legend><span class="required-element">*</span>Escoge el color del perfil:</legend>
            <label class="color"><input type="radio" name="color" value="blanco">Blanco <div class="color-option" id="color-blanco"></div></label>
            <label class="color"><input type="radio" name="color" value="madera"> Madera <div class="color-option" id="color-madera"></div></label>
            <label class="color"><input type="radio" name="color" value="mate"> Mate <div class="color-option" id="color-mate"></div></label>
            <label class="color"><input type="radio" name="color" value="Negro"> Negro <div class="color-option" id="color-negro"></div></label>
            <label class="color"><input type="radio" name="color" value="titanio"> Titanio <div class="color-option" id="color-titanio"></div></label>
        </fieldset>
    `;
    }

    fieldset.innerHTML = innerElements;
    return fieldset;
}

function createDoor() {
    let selectedService = config.puerta;

    let fieldset = document.createElement("fieldset");
    fieldset.classList.add(`cotizacion-${selectedService.name}`);



    let innerElements = `
            <legend>Cotización de ${selectedService.name}</legend>`;

    innerElements += `
            <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto "cm".</i></div>
            <div class="div-label-input">
            <label>
                <p><span class="required-element">*</span>Ancho (cm):</p>
                <input placeholder="Ejemplo: 125 (cm)" type="number" name="width" required class="${selectedService.name}-width">
            </label>
            <label>
                <p><span class="required-element">*</span>Alto (cm): </p> 
                <input placeholder="Ejemplo: 90 (cm)" type="number" name="height" required class="${selectedService.name}-height">
            </label>
            </div>
        `;

    // opciones de línea de aluminio solo si aplica
    if (selectedService.lineOptions) {
        innerElements += `
            <fieldset>
                <legend><span class="required-element">*</span>Línea Aluminio:</legend>
                ${selectedService.lineOptions.map(line => `
                    <label>
                        <input type="radio" name="line" required value="${line}"> ${line}
                    </label>
                `).join('')}
            </fieldset>
        `;

        innerElements += `
        <fieldset>
            <legend><span class="required-element">*</span>Escoge el color del marco:</legend>
            <label class="color"><input type="radio" name="color" value="blanco">Blanco <div class="color-option" id="color-blanco"></div></label>
            <label class="color"><input type="radio" name="color" value="madera"> Madera <div class="color-option" id="color-madera"></div></label>
            <label class="color"><input type="radio" name="color" value="mate"> Mate <div class="color-option" id="color-mate"></div></label>
            <label class="color"><input type="radio" name="color" value="Negro"> Negro <div class="color-option" id="color-negro"></div></label>
            <label class="color"><input type="radio" name="color" value="titanio"> Titanio <div class="color-option" id="color-titanio"></div></label>
        </fieldset>
        <fieldset class="hidden-toggles">

            <input name="coloration-level" type="radio" id="coloration-low" class="hidden-toggles__input">
            <label for="coloration-low" class="hidden-toggles__label">Low</label>

            <input name="coloration-level" type="radio" id="coloration-medium" class="hidden-toggles__input" checked>
            <label for="coloration-medium" class="hidden-toggles__label">Medium</label>

            <input name="coloration-level" type="radio" id="coloration-high" class="hidden-toggles__input">
            <label for="coloration-high" class="hidden-toggles__label">High</label>

            <input name="coloration-level" type="radio" id="coloration-striking" class="hidden-toggles__input">
            <label for="coloration-striking" class="hidden-toggles__label">Striking</label>

        </fieldset>
    `;
    }

    fieldset.innerHTML = innerElements;
    return fieldset;
}

function createMirror() {

    let selectedService = config.espejo;
    let fieldset = document.createElement("fieldset");

    fieldset.classList.add(`cotizacion-${selectedService.name}`);

    let innerElements = `
            <legend>Cotización de ${selectedService.name}</legend>`;
    innerElements += `
            <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto "cm".</i></div>
            <div class="div-label-input">
            <label>
                <p><span class="required-element">*</span>Ancho (cm):</p>
                <input placeholder="Ejemplo: 125 (cm)" type="number" name="width" required class="${selectedService.name}-width">
            </label>
            <label>
                <p><span class="required-element">*</span>Alto (cm): </p> 
                <input placeholder="Ejemplo: 90 (cm)" type="number" name="height" required class="${selectedService.name}-height">
            </label>
            </div>
        `;

    fieldset.innerHTML = innerElements;

    return fieldset;
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
