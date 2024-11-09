let selectService = document.getElementById("service");
const displayOption = document.getElementById("display-option");


function btnAdd() {
    let fragment = document.createDocumentFragment();
    let fragmentSelect = document.createDocumentFragment();
    fragmentSelect.innerHTML = `
                <fieldset>

                <legend><span class="required-element">*</span>¿Qué quieres cotizar?</legend>
                <label>
                    <select name="service" id="service" required>
                        <option value="" selected aria-disabled="true" disabled>Elige el producto o servicio...</option>
                        <option value="celocia">Celocia</option>
                        <option value="espejo">Espejo</option>
                        <option value="puerta">Puerta</option>
                        <option value="ventanaNormal">Ventana</option>
                        <option value="ventanaProyectante">Ventana Proyectante</option>

                    </select>
                </label>
            </fieldset>
    `;
    let div = document.createElement("div");
    div.classList.add("new-service");

    let addBtn = document.createElement("button");
    addBtn.setAttribute("title", "Añadir nueva cotización");
    addBtn.id = "add-btn";

    let img = document.createElement("img");
    img.setAttribute("src", "../images/svg/add-btn.svg");
    img.setAttribute("alt", "Simbolo de añadir");

    addBtn.appendChild(img);

    addBtn.addEventListener("click", () => {
        addBtn.remove();

        div.appendChild();

    })

    div.appendChild(addBtn);
    fragment.appendChild(div);

    return fragment;
}


// function removeService(params) {

// }


function createQuoteOptions() {
    const fragment = document.createDocumentFragment();


    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerHTML = `<span class="required-element">*</span>¿Qué quieres cotizar?`;

    const label = document.createElement("label");
    const select = document.createElement("select");
    select.name = "service";
    select.id = "service";
    select.required = true;

    
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.setAttribute("aria-disabled", "true");
    defaultOption.textContent = "Elige el producto o servicio...";

  
    const options = [
        { value: "celocia", text: "Celocia" },
        { value: "espejo", text: "Espejo" },
        { value: "puerta", text: "Puerta" },
        { value: "ventanaNormal", text: "Ventana" },
        { value: "ventanaProyectante", text: "Ventana Proyectante" }
    ];


    select.appendChild(defaultOption);
    options.forEach(({ value, text }) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    });


    select.addEventListener("change", (e) => {
        const closestContainer = e.target.closest(".new-service");
        closestContainer.innerHTML = ""; 
        closestContainer.appendChild(select); 
        closestContainer.appendChild(createBaseQuote(e.target.value));
    });

 
    label.appendChild(select);
    fieldset.appendChild(legend);
    fieldset.appendChild(label);
    fragment.appendChild(fieldset);

    return fragment;
}





function createBaseQuote(serviceType) {

    const config = {
        celocia: { name: "Celocia", lineOptions: ["Pequeña", "Grande"] },
        espejo: { name: "Espejo", lineOptions: false },
        puerta: { name: "Puerta", lineOptions: ["Linea 35"] },
        ventanaNormal: { name: "Ventana", lineOptions: ["Linea 25", "Linea 5000"] },
        ventanaProyectante: { name: "Ventana Proyectante", lineOptions: ["Linea 42"] }

    };


    let divContainer = document.createElement("div");
    divContainer.classList.add(`cotizacion-${serviceType}`);
    let fieldset = document.createElement("fieldset");

    let selectedService = config[serviceType];

    let innerElements = `
            <legend>Cotización de ${selectedService.name}</legend>`;

    if (serviceType === "celocia") {
        innerElements += `
        <fieldset>
            <legend>Color:</legend>
            <label class="color"><input type="radio" name="color" value="blanco">Blanco <div class="color-option" id="color-blanco"></div></label>
            <label class="color"><input type="radio" name="color" value="madera"> Madera <div class="color-option" id="color-madera"></div></label>
            <label class="color"><input type="radio" name="color" value="mate"> Mate <div class="color-option" id="color-mate"></div></label>
            <label class="color"><input type="radio" name="color" value="Negro"> Negro <div class="color-option" id="color-negro"></div></label>
            <label class="color"><input type="radio" name="color" value="titanio"> Titanio <div class="color-option" id="color-titanio"></div></label>
        </fieldset>
        <fieldset>
            <legend>Tamaño:</legend>
            <label><input type="radio" name="tamaño" value="grande"> Grande</label>
            <label><input type="radio" name="tamaño" value="pequeña"> Pequeña</label>
        </fieldset>
    `;


    } else {


        // Form Base
        innerElements = `
            <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto "cm".</i></div>
            <label>
                <p>Ancho:</p>
                <input placeholder="Ejemplo: 125 (cm)" type="number" name="width" required id="${serviceType}-width"> Cm
            </label>
            <label>
                <p>Alto: </p> 
                <input placeholder="Ejemplo: 90 (cm)" type="number" name="height" required id="${serviceType}-height"> Cm
            </label>
        `;

        // opciones de línea de aluminio solo si aplica
        if (selectedService.lineOptions) {
            innerElements += `
            <fieldset>
                <legend>Línea Aluminio:</legend>
                ${selectedService.lineOptions.map(line => `
                    <label>
                        <input type="radio" name="line" required value="${line}"> ${line}
                    </label>
                `).join('')}
            </fieldset>
        `;

            // opciones adicionales de color, tipo de cristal y grosor

            // esto despues lo puedo separar en otra condicional mas si es necesario
            innerElements += `
        <fieldset>
            <legend>Color:</legend>
            <label class="color"><input type="radio" name="color" value="blanco">Blanco <div class="color-option" id="color-blanco"></div></label>
            <label class="color"><input type="radio" name="color" value="madera"> Madera <div class="color-option" id="color-madera"></div></label>
            <label class="color"><input type="radio" name="color" value="mate"> Mate <div class="color-option" id="color-mate"></div></label>
            <label class="color"><input type="radio" name="color" value="Negro"> Negro <div class="color-option" id="color-negro"></div></label>
            <label class="color"><input type="radio" name="color" value="titanio"> Titanio <div class="color-option" id="color-titanio"></div></label>
        </fieldset>
    `;
        }

    }
    fieldset.innerHTML = innerElements;
    divContainer.appendChild(fieldset);
    return divContainer;
}

displayOption.appendChild(btnAdd());






























// function createBaseQuote(serviceType) {

//     const config = {
//         celocia: { name: "Celocia", lineOptions: ["Pequeña", "Grande"] },
//         espejo: { name: "Espejo", lineOptions: false },
//         puerta: { name: "Puerta", lineOptions: ["Linea 35"] },
//         ventanaNormal: { name: "Ventana", lineOptions: ["Linea 25", "Linea 5000"] },
//         ventanaProyectante: { name: "Ventana Proyectante", lineOptions: ["Linea 42"] }

//     };

//     let divContainer = document.createElement("div");
//     divContainer.classList.add(`cotizacion-${serviceType}`);
//     let fieldset = document.createElement("fieldset");

//     let selectedService = config[serviceType];

//     let innerElements = `
//             <legend>Cotización de ${selectedService.name}</legend>`;

//     if (serviceType === "celocia") {
//         innerElements += `
//         <fieldset>
//             <legend>Color:</legend>
//             <label class="color"><input type="radio" name="color" value="blanco">Blanco <div class="color-option" id="color-blanco"></div></label>
//             <label class="color"><input type="radio" name="color" value="madera"> Madera <div class="color-option" id="color-madera"></div></label>
//             <label class="color"><input type="radio" name="color" value="mate"> Mate <div class="color-option" id="color-mate"></div></label>
//             <label class="color"><input type="radio" name="color" value="Negro"> Negro <div class="color-option" id="color-negro"></div></label>
//             <label class="color"><input type="radio" name="color" value="titanio"> Titanio <div class="color-option" id="color-titanio"></div></label>
//         </fieldset>
//         <fieldset>
//             <legend>Tamaño:</legend>
//             <label><input type="radio" name="tamaño" value="grande"> Grande</label>
//             <label><input type="radio" name="tamaño" value="pequeña"> Pequeña</label>
//         </fieldset>
//     `;


//     } else {


//         // Form Base
//         innerElements = `
//             <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto "cm".</i></div>
//             <label>
//                 <p>Ancho:</p>
//                 <input placeholder="Ejemplo: 125 (cm)" type="number" name="width" required id="${serviceType}-width"> Cm
//             </label>
//             <label>
//                 <p>Alto: </p> 
//                 <input placeholder="Ejemplo: 90 (cm)" type="number" name="height" required id="${serviceType}-height"> Cm
//             </label>
//         `;

//         // opciones de línea de aluminio solo si aplica
//         if (selectedService.lineOptions) {
//             innerElements += `
//             <fieldset>
//                 <legend>Línea Aluminio:</legend>
//                 ${selectedService.lineOptions.map(line => `
//                     <label>
//                         <input type="radio" name="line" required value="${line}"> ${line}
//                     </label>
//                 `).join('')}
//             </fieldset>
//         `;
            
//             // opciones adicionales de color, tipo de cristal y grosor

//             // esto despues lo puedo separar en otra condicional mas si es necesario
//             innerElements += `
//         <fieldset>
//             <legend>Color:</legend>
//             <label class="color"><input type="radio" name="color" value="blanco">Blanco <div class="color-option" id="color-blanco"></div></label>
//             <label class="color"><input type="radio" name="color" value="madera"> Madera <div class="color-option" id="color-madera"></div></label>
//             <label class="color"><input type="radio" name="color" value="mate"> Mate <div class="color-option" id="color-mate"></div></label>
//             <label class="color"><input type="radio" name="color" value="Negro"> Negro <div class="color-option" id="color-negro"></div></label>
//             <label class="color"><input type="radio" name="color" value="titanio"> Titanio <div class="color-option" id="color-titanio"></div></label>
//         </fieldset>
//     `;
//         }

//     }
//     fieldset.innerHTML = innerElements;
//     divContainer.appendChild(fieldset);
//     return divContainer;
// }

// // Ejemplo de uso


// selectService.addEventListener("change", (e) => {
//     displayOption.innerHTML = "";
//     displayOption.appendChild(createBaseQuote(e.target.value));
// });






// // Precios de aluminio por m²
// const precios = {
//     ventana: {
//         'linea-25': {
//             mate: 80000,
//             titanio: 90000,
//             blanco: 90000,
//             negro: 90000,
//             madera: 120000
//         },
//         'linea-5000': {
//             mate: 50000,
//             titanio: 60000,
//             blanco: 60000,
//             negro: 60000,
//             madera: 70000
//         }
//     },
//     puerta: {
//         'linea-35': {
//             todos: 180000
//         }
//     },
//     proyectante: {
//         'linea-42': {
//             todos: 90000
//         }
//     },
//     celosia: {
//         pequeña: 70000,
//         grande: 110000
//     },
//     espejo: 60000
// };

// // Función para calcular el costo final basado en selección
// function calcularCosto(service, linea, color, ancho, alto) {
//     let area = (ancho / 100) * (alto / 100); // Conversión a metros cuadrados
//     let precioBase;

//     if (service === 'espejo') {
//         precioBase = precios.espejo;
//     } else if (service === 'celosia') {
//         precioBase = precios.celosia[linea];
//     } else {
//         precioBase = precios[service][linea][color] || precios[service][linea].todos;
//     }

//     return area * precioBase;
// }
