const displayOption = document.getElementById("display-option");

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

function createAddButton() {

    let addBtn = document.createElement("button");
    addBtn.classList.add("add-btn");
    addBtn.setAttribute("title", "Añadir nueva cotización");


    const img = document.createElement("img");
    img.setAttribute("src", "../images/svg/add-btn.svg");
    img.setAttribute("alt", "Simbolo de añadir");

    addBtn.appendChild(img);
    addBtn.addEventListener("click", handleAddButtonClick);

    return addBtn;
}

function handleAddButtonClick(event) {
    const addBtn = event.currentTarget;
    const container = addBtn.parentElement;

    const deleteButton = createDeleteButton(container);
    addBtn.remove();


    let serviceSelect = createServiceSelect(deleteButton);
    serviceSelect.addEventListener("change", (e) => {
        handleServiceSelectChange(e, container, deleteButton);
    });


    container.appendChild(serviceSelect);
    container.appendChild(deleteButton);

    displayOption.appendChild(createAddButtonContainer());

}


function handleServiceSelectChange(event, parentContainer, childBefore) {
    chooseOptionToDisplay(event.target.value, parentContainer, childBefore);
}


function chooseOptionToDisplay(param, parent, childBefore) {
  
    let div = parent.querySelector(".show-service");
    if (!div) {
        div = document.createElement("div");
        div.classList.add("show-service");
        parent.insertBefore(div, childBefore);
    } else {
        div.innerHTML = "";
    }


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




function createAddButtonContainer() {
    const div = document.createElement("div");
    div.classList.add("new-service");
    div.appendChild(createAddButton());
    return div;
}


function createServiceSelect(deleteBtn) {

    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.innerHTML = `<span class="required-element">*</span>¿Qué quieres cotizar? `;
    legend.appendChild(deleteBtn);
    fieldset.appendChild(legend);
    let label = document.createElement("label");
    label.innerHTML = `
        <select name="service" id="service" required> 
            <option value="" selected aria-disabled="true" disabled>Elige el producto o servicio...</option>
            <option value="celocia">Celocia </option>
            <option value="espejo">Espejo</option>
            <option value="puerta">Puerta</option>
            <option value="ventanaNormal">Ventana</option>
            <option value="ventanaProyectante">Ventana Proyectante</option>
        </select>
    `;
    fieldset.appendChild(label);
    return fieldset;
}




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


function createWindow() {
    let selectedService = config.ventanaNormal;

    let fieldset = document.createElement("fieldset");
    fieldset.classList.add(`cotizacion-${selectedService.name }`);

    

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

function createCelocia() {
    let selectedService = config.celocia;

    let fieldset = document.createElement("fieldset");
    fieldset.classList.add(`cotizacion-${selectedService.name}`);



    let innerElements = `
            <legend>Cotización de ${selectedService.name}</legend>`;
    innerElements += `
        <fieldset>
            <legend><span class="required-element">*</span>Escoge un color:</legend>
            <label class="color"><input type="radio" name="color" required value="blanco">Blanco <div class="color-option" id="color-blanco"></div></label>
            <label class="color"><input type="radio" name="color" required value="madera"> Madera <div class="color-option" id="color-madera"></div></label>
            <label class="color"><input type="radio" name="color" required value="mate"> Mate <div class="color-option" id="color-mate"></div></label>
            <label class="color"><input type="radio" name="color" required value="Negro"> Negro <div class="color-option" id="color-negro"></div></label>
            <label class="color"><input type="radio" name="color" required value="titanio"> Titanio <div class="color-option" id="color-titanio"></div></label>
        </fieldset>
        <fieldset>
            <legend><span class="required-element">*</span>Tamaño:</legend>
            <label><input type="radio" name="tamaño" value="grande" required> Grande</label>
            <label><input type="radio" name="tamaño" value="pequeña" required> Pequeña</label>
        </fieldset>
    `;
    fieldset.innerHTML = innerElements;

    return fieldset;
}



displayOption.appendChild(createAddButtonContainer());





// Calculos

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
