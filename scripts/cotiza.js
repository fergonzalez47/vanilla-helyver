let selectService = document.getElementById("service");


selectService.addEventListener("change", () => {

    let option = selectService.value;
    switch (option) {
        case "ventana":
            console.log("ventana");
            break;

        case "puerta":
            console.log("puerta");
            break;

        case "espejo":
            console.log("espejo");
            break;

        default:
            break;
    }
})



function createWindowQuote() {

    let fieldset = document.createElement("fieldset");
    let innerElements = `
    <legend>Cotización de Ventana</legend>

        <div><i>Por favor, ingrese solo el número de las medidas en centímetros (cm), sin incluir el texto "cm".</i></div>
        </div>
        <label>
            <p>Ancho: </p>
            <input placeholder="Ejemplo: 125 (cm)" type="number" name="window-width" required id="window-width"> Cm
        </label>
        <label>
            <p>Alto: </p> <input placeholder="Ejemplo: 90 (cm)" type="number" name="window-height" required id="window-height"> Cm
        </label>
    `;

    fieldset.setAttribute("value", param.id);
    return fieldset;
};