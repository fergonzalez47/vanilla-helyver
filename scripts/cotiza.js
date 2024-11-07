let selectService = document.getElementById("service");
// let displayOption = document.getElementById("display-option");


// selectService.addEventListener("change", () => {

//     let option = selectService.value;
//     displayOption.innerHTML = "";
//     switch (option) {
//         case "ventana":
//             displayOption.appendChild(createWindowQuote());
//             console.log("ventana");

//             break;

//         case "puerta":
//             console.log("puerta");
//             break;

//         case "espejo":
//             console.log("espejo");
//             break;

//         default:
//             break;
//     }
// })



function createWindowQuote() {

    let fieldset = document.createElement("fieldset");
    let innerElements = `
       <div class="cotizacion-ventana">
    <fieldset>
        <legend>Cotización de Ventana</legend>
        <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto "cm".</i></div>
        <label>
            <p>Ancho:</p>
            <input placeholder="Ejemplo: 125 (cm)" type="number" name="window-width" required id="window-width"> Cm
        </label>
        <label>
            <p>Alto:</p>
            <input placeholder="Ejemplo: 90 (cm)" type="number" name="window-height" required id="window-height"> Cm
        </label>
    </fieldset>

    <fieldset>
        <legend><span class="required-element">*</span>Línea Aluminio:</legend>
        <label>
            <input type="radio" name="line" required id="line-25" value="line-25"> Línea 25
        </label>
        <label>
            <input type="radio" name="line" required id="line-5000" value="line-5000"> Línea 5000
        </label>
    </fieldset>
</div>`;

    fieldset.innerHTML = innerElements;
    return fieldset;
};


function createDoorQuote() {

}

function createMirrorQuote() {
    let fieldset = document.createElement("fieldset");
    let innerElements = `
        <div class="cotizacion-espejo">

                    <legend>Cotización de Espejo</legend>

                    <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto
                            "cm".</i></div>
                    <label>
                        <p>Ancho:</p>
                        <input placeholder="Ejemplo: 125 (cm)" type="number" name="window-width" required
                            id="window-width"> Cm
                    </label>
                    <label>
                        <p>Alto: </p> <input placeholder="Ejemplo: 90 (cm)" type="number" name="window-height" required
                            id="window-height"> Cm
                    </label>
                </fieldset>

                <fieldset>
                    <legend><span class="required-element">*</span>Linea Aluminio: </legend>
                    <label>
                        <input type="radio" name="line" required id="line-25" value="line-25"> Linea 25
                    </label>
                    <label>
                        <input type="radio" name="line" required id="line-5000" value="line-5000"> Linea 5000
                    </label>
    `;

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
        // Agregar opciones adicionales de color, tipo de cristal y grosor
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

// Ejemplo de uso
const displayOption = document.getElementById("display-option");
document.getElementById("service").addEventListener("change", (e) => {
    displayOption.innerHTML = ""; // Limpia el contenido previo
    displayOption.appendChild(createBaseQuote(e.target.value));
});






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
